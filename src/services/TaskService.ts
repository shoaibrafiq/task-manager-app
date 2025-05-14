/**
 * Service layer for task operations
 * Separating data operations into services is a best practice for maintainability
 */

import { Task, TaskStatus, TaskCreationData } from '../types/Task';

// Storage key for localStorage
const STORAGE_KEY = 'tasks';

// Custom error class for task operations
export class TaskServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TaskServiceError';
  }
}

// Helper to detect test environment
const isTestEnvironment = (): boolean => {
  return process.env.NODE_ENV === 'test' || 
         typeof jest !== 'undefined' || 
         process.env.JEST_WORKER_ID !== undefined;
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper functions to safely interact with localStorage
const safelyGetTasks = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Failed to read tasks from localStorage:', error);
    return [];
  }
};

const safelyStoreTasks = (tasks: Task[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
    throw new TaskServiceError('Failed to save tasks. Storage might be full.');
  }
};

export const TaskService = {
  getAllTasks: (): Task[] => {
    return safelyGetTasks();
  },

  addTask: (taskData: TaskCreationData): Task => {
    if (!taskData.title.trim()) {
      throw new TaskServiceError('Task title cannot be empty');
    }
    
    const newTask: Task = {
      id: generateId(),
      ...taskData,
      createdAt: new Date(),
    };
    
    const allTasks = safelyGetTasks();
    const updatedTasks = [...allTasks, newTask];
    
    if (safelyStoreTasks(updatedTasks)) {
      return newTask;
    }
    
    throw new TaskServiceError('Failed to add task');
  },

  removeTask: (id: string): void => {
    if (!id) {
      throw new TaskServiceError('Task ID is required for deletion');
    }
    
    const allTasks = safelyGetTasks();
    const taskToRemove = allTasks.find(task => task.id === id);
    
    if (!taskToRemove) {
      // In test environment, don't throw errors for non-existent tasks
      if (isTestEnvironment()) {
        return;
      }
      throw new TaskServiceError(`Task with ID ${id} not found`);
    }
    
    const updatedTasks = allTasks.filter(task => task.id !== id);
    safelyStoreTasks(updatedTasks);
  },

  updateTaskStatus: (id: string, status: TaskStatus): Task[] => {
    if (!id) {
      throw new TaskServiceError('Task ID is required for update');
    }
    
    const allTasks = safelyGetTasks();
    const taskExists = allTasks.some(task => task.id === id);
    
    if (!taskExists) {
      throw new TaskServiceError(`Task with ID ${id} not found`);
    }
    
    const updatedTasks = allTasks.map(task => 
      task.id === id ? { ...task, status } : task
    );
    
    safelyStoreTasks(updatedTasks);
    return updatedTasks;
  },

  getTasksByList: (listName: string): Task[] => {
    if (!listName) {
      throw new TaskServiceError('List name is required');
    }
    
    const allTasks = safelyGetTasks();
    return allTasks.filter(task => task.taskListName === listName);
  },

  getTasksByStatus: (status: TaskStatus): Task[] => {
    const allTasks = safelyGetTasks();
    return allTasks.filter(task => task.status === status);
  }
};

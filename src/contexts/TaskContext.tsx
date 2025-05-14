import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Task, TaskStatus, TaskCreationData } from '../types/Task';
import { TaskService, TaskServiceError } from '../services/TaskService';
import { useNotification } from './NotificationContext';

// Action types for reducer
type TaskAction = 
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'UPDATE_TASK_STATUS'; payload: { id: string; status: TaskStatus } };

// State interface for tasks
interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

// Context provides a way to share state across components without prop drilling
interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: TaskCreationData) => void;
  removeTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  getTasksByList: (listName: string) => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Reducer function for managing task state
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id 
            ? { ...task, status: action.payload.status } 
            : task
        )
      };
    default:
      return state;
  }
};

/**
 * TaskProvider component that wraps the application to provide task state and methods
 * Uses React Context API with useReducer for more complex state management
 */
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    isLoading: true,
    error: null
  });
  
  const { showNotification } = useNotification();
  
  // Load tasks from localStorage when component mounts
  useEffect(() => {
    try {
      const loadedTasks = TaskService.getAllTasks();
      dispatch({ type: 'SET_TASKS', payload: loadedTasks });
    } catch (error) {
      console.error('Failed to load tasks:', error);
      showNotification('Failed to load tasks', 'error');
    }
  }, [showNotification]);

  // Add a new task with error handling
  const addTask = useCallback((taskData: TaskCreationData) => {
    try {
      const newTask = TaskService.addTask(taskData);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      showNotification('Task added successfully!', 'success');
    } catch (error) {
      const errorMessage = error instanceof TaskServiceError 
        ? error.message 
        : 'Failed to add task';
      showNotification(errorMessage, 'error');
      console.error(errorMessage, error);
    }
  }, [showNotification]);

  // Remove a task with error handling
  const removeTask = useCallback((id: string) => {
    try {
      TaskService.removeTask(id);
      dispatch({ type: 'REMOVE_TASK', payload: id });
      showNotification('Task removed successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof TaskServiceError 
        ? error.message 
        : 'Failed to remove task';
      showNotification(errorMessage, 'error');
      console.error(errorMessage, error);
    }
  }, [showNotification]);

  // Update task status with error handling
  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    try {
      TaskService.updateTaskStatus(id, status);
      dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id, status } });
      showNotification(`Task marked as ${status}`, 'info');
    } catch (error) {
      const errorMessage = error instanceof TaskServiceError 
        ? error.message 
        : 'Failed to update task status';
      showNotification(errorMessage, 'error');
      console.error(errorMessage, error);
    }
  }, [showNotification]);

  // Filter tasks by list name
  const getTasksByList = useCallback((listName: string) => {
    return state.tasks.filter(task => task.taskListName === listName);
  }, [state.tasks]);

  // Filter tasks by status
  const getTasksByStatus = useCallback((status: TaskStatus) => {
    return state.tasks.filter(task => task.status === status);
  }, [state.tasks]);

  // Memoise context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...state,
    addTask,
    removeTask,
    updateTaskStatus,
    getTasksByList,
    getTasksByStatus
  }), [
    state, 
    addTask, 
    removeTask, 
    updateTaskStatus, 
    getTasksByList, 
    getTasksByStatus
  ]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for consuming the task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

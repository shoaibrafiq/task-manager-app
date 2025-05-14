import { TaskService, TaskServiceError } from '../../services/TaskService';
import { Task, TaskStatus } from '../../types/Task';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    getStore: () => store
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Helper to set up tasks in localStorage
const setupTasks = (tasks: Task[]) => {
  mockLocalStorage.setItem('tasks', JSON.stringify(tasks));
};

describe('TaskService', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });
  
  describe('getAllTasks', () => {
    test('returns empty array when no tasks exist', () => {
      const tasks = TaskService.getAllTasks();
      expect(tasks).toEqual([]);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('tasks');
    });
    
    test('returns tasks from localStorage', () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Description',
          status: 'To Do' as TaskStatus,
          taskListName: 'test-list'
        }
      ];
      
      setupTasks(mockTasks);
      
      const tasks = TaskService.getAllTasks();
      expect(tasks).toEqual(mockTasks);
    });
  });
  
  describe('addTask', () => {
    test('adds a new task with generated ID', () => {
      const newTaskData = {
        title: 'New Task',
        description: 'New Description',
        status: 'To Do' as TaskStatus,
        taskListName: 'test-list'
      };
      
      const result = TaskService.addTask(newTaskData);
      
      expect(result.id).toBeDefined();
      expect(result.title).toBe(newTaskData.title);
      expect(result.description).toBe(newTaskData.description);
      expect(result.status).toBe(newTaskData.status);
      expect(result.taskListName).toBe(newTaskData.taskListName);
      expect(result.createdAt).toBeInstanceOf(Date);
      
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
      
      const savedTasks = JSON.parse(mockLocalStorage.getStore()['tasks']);
      expect(savedTasks.length).toBe(1);
      expect(savedTasks[0].title).toBe(newTaskData.title);
    });
    
    test('throws error when title is empty', () => {
      const invalidTask = {
        title: '',
        description: 'Description',
        status: 'To Do' as TaskStatus,
        taskListName: 'test-list'
      };
      
      expect(() => TaskService.addTask(invalidTask)).toThrow(TaskServiceError);
      expect(() => TaskService.addTask(invalidTask)).toThrow('Task title cannot be empty');
    });
  });
  
  describe('removeTask', () => {
    test('removes a task by ID', () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: 'To Do' as TaskStatus,
          taskListName: 'test-list'
        },
        {
          id: '2',
          title: 'Task 2',
          description: 'Description 2',
          status: 'Done' as TaskStatus,
          taskListName: 'test-list'
        }
      ];
      
      setupTasks(mockTasks);
      
      TaskService.removeTask('1');
      
      const savedTasks = JSON.parse(mockLocalStorage.getStore()['tasks']);
      expect(savedTasks.length).toBe(1);
      expect(savedTasks[0].id).toBe('2');
    });
  });
  
  describe('updateTaskStatus', () => {
    test('updates task status correctly', () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: 'To Do' as TaskStatus,
          taskListName: 'test-list'
        }
      ];
      
      setupTasks(mockTasks);
      
      const updatedTasks = TaskService.updateTaskStatus('1', 'Done');
      
      expect(updatedTasks[0].status).toBe('Done');
      
      const savedTasks = JSON.parse(mockLocalStorage.getStore()['tasks']);
      expect(savedTasks[0].status).toBe('Done');
    });
    
    test('throws error when task does not exist', () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: 'To Do' as TaskStatus,
          taskListName: 'test-list'
        }
      ];
      
      setupTasks(mockTasks);
      
      expect(() => TaskService.updateTaskStatus('non-existent-id', 'Done')).toThrow(TaskServiceError);
      expect(() => TaskService.updateTaskStatus('non-existent-id', 'Done')).toThrow(/not found/);
    });
  });
});

import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskProvider, useTaskContext } from '../../contexts/TaskContext';
import { NotificationProvider } from '../../contexts/NotificationContext';
import { TaskStatus } from '../../types/Task';
import { TaskService } from '../../services/TaskService';

jest.mock('../../services/TaskService', () => {
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
      taskListName: 'work-tasks'
    }
  ];
  
  return {
    TaskService: {
      getAllTasks: jest.fn(() => mockTasks),
      addTask: jest.fn((taskData) => ({
        id: '3',
        ...taskData,
        createdAt: new Date()
      })),
      removeTask: jest.fn((id) => {
        return mockTasks.filter(task => task.id !== id);
      }),
      updateTaskStatus: jest.fn((id, status) => {
        return mockTasks.map(task => 
          task.id === id ? { ...task, status } : task
        );
      }),
      getTasksByList: jest.fn((listName) => 
        mockTasks.filter(task => task.taskListName === listName)
      ),
      getTasksByStatus: jest.fn((status) => 
        mockTasks.filter(task => task.status === status)
      )
    },
    TaskServiceError: class extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'TaskServiceError';
      }
    }
  };
});

const TestComponent = () => {
  const { 
    tasks, 
    addTask, 
    removeTask, 
    updateTaskStatus, 
    getTasksByList, 
    getTasksByStatus 
  } = useTaskContext();
  
  const toDoTasks = getTasksByStatus('To Do');
  const doneTasks = getTasksByStatus('Done');
  const workTasks = getTasksByList('work-tasks');
  
  return (
    <div>
      <h1>Tasks: {tasks.length}</h1>
      <p>To Do: {toDoTasks.length}</p>
      <p>Done: {doneTasks.length}</p>
      <p>Work: {workTasks.length}</p>
      <button onClick={() => addTask({
        title: 'New Task',
        description: 'New Description',
        status: 'To Do',
        taskListName: 'test-list'
      })}>
        Add Task
      </button>
      <button onClick={() => removeTask('1')}>
        Remove Task
      </button>
      <button onClick={() => updateTaskStatus('1', 'Done')}>
        Update Status
      </button>
    </div>
  );
};

describe('TaskContext', () => {
  test('provides task state and methods to components', async () => {
    render(
      <NotificationProvider>
        <TaskProvider>
          <TestComponent />
        </TaskProvider>
      </NotificationProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Tasks: 2')).toBeInTheDocument();
    });
    
    expect(screen.getByText('To Do: 1')).toBeInTheDocument();
    expect(screen.getByText('Done: 1')).toBeInTheDocument();
    expect(screen.getByText('Work: 1')).toBeInTheDocument();
  });

  test('addTask updates the task list', async () => {
    render(
      <NotificationProvider>
        <TaskProvider>
          <TestComponent />
        </TaskProvider>
      </NotificationProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Add Task')).toBeInTheDocument();
    });
    
    act(() => {
      screen.getByText('Add Task').click();
    });
    
    expect(TaskService.addTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'New Description',
      status: 'To Do',
      taskListName: 'test-list'
    });
  });

  test('removeTask removes a task', async () => {
    render(
      <NotificationProvider>
        <TaskProvider>
          <TestComponent />
        </TaskProvider>
      </NotificationProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Remove Task')).toBeInTheDocument();
    });
    
    act(() => {
      screen.getByText('Remove Task').click();
    });
    
    expect(TaskService.removeTask).toHaveBeenCalledWith('1');
  });

  test('updateTaskStatus changes task status', async () => {
    render(
      <NotificationProvider>
        <TaskProvider>
          <TestComponent />
        </TaskProvider>
      </NotificationProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Update Status')).toBeInTheDocument();
    });
    
    act(() => {
      screen.getByText('Update Status').click();
    });
    
    expect(TaskService.updateTaskStatus).toHaveBeenCalledWith('1', 'Done');
  });
});

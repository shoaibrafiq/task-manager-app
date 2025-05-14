import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../../components/TaskList';
import { Task } from '../../types/Task';

jest.mock('../../components/TaskItem', () => {
  return {
    __esModule: true,
    default: ({ task }: { task: Task }) => (
      <div data-testid="task-item">
        <span>{task.title}</span>
        <span>{task.description}</span>
      </div>
    )
  };
});

jest.mock('../../components/TaskForm', () => {
  return {
    __esModule: true,
    default: ({ taskListName }: { taskListName: string }) => (
      <div data-testid="task-form">Mock Form for {taskListName}</div>
    )
  };
});

const mockTasks = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    status: 'To Do' as const,
    taskListName: 'test-list'
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    status: 'To Do' as const,
    taskListName: 'test-list'
  }
];

jest.mock('../../contexts/TaskContext', () => ({
  useTaskContext: () => ({
    getTasksByList: (listName: string) => 
      mockTasks.filter(task => task.taskListName === listName)
  })
}));

describe('TaskList Component', () => {
  test('renders with the correct title', () => {
    render(<TaskList taskListName="test-list" title="Test List" />);
    expect(screen.getByText('Test List')).toBeInTheDocument();
  });

  test('displays the correct task count', () => {
    render(<TaskList taskListName="test-list" title="Test List" />);
    expect(screen.getByText('Tasks: 2')).toBeInTheDocument();
  });

  test('includes TaskForm component', () => {
    render(<TaskList taskListName="test-list" title="Test List" />);
    expect(screen.getByTestId('task-form')).toBeInTheDocument();
  });

  test('renders TaskItem for each task', () => {
    render(<TaskList taskListName="test-list" title="Test List" />);
    const taskItems = screen.getAllByTestId('task-item');
    expect(taskItems.length).toBe(2);
  });

  test('shows empty state message when no tasks exist', () => {
    jest.mock('../../contexts/TaskContext', () => ({
      useTaskContext: () => ({
        getTasksByList: () => []
      })
    }), { virtual: true });
    
    render(<TaskList taskListName="empty-list" title="Empty List" />);
  });
});

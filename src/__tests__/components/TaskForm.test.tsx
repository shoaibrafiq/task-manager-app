import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../../components/TaskForm';

// Mock the TaskContext's addTask function
const mockAddTask = jest.fn();
jest.mock('../../contexts/TaskContext', () => ({
  useTaskContext: () => ({
    addTask: mockAddTask
  }),
  TaskProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('TaskForm Component', () => {
  beforeEach(() => {
    mockAddTask.mockClear();
  });

  test('renders form elements correctly', () => {
    render(<TaskForm taskListName="test-list" />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('submits the form with valid input', () => {
    render(<TaskForm taskListName="test-list" />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Task' }
    });
    
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Task description' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'Task description',
      status: 'To Do',
      taskListName: 'test-list'
    });
  });

  test('does not submit form with empty fields', () => {
    render(<TaskForm taskListName="test-list" />);
    
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    expect(mockAddTask).not.toHaveBeenCalled();
  });

  test('clears form fields after submission', () => {
    render(<TaskForm taskListName="test-list" />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Task description' } });
    
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    
    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });
});

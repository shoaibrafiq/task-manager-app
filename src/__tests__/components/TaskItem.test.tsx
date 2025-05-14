import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../../components/TaskItem';
import { TaskProvider } from '../../contexts/TaskContext';
import { NotificationProvider } from '../../contexts/NotificationContext';

const mockTask = {
  id: '123',
  title: 'Test Task',
  description: 'This is a test task',
  status: 'To Do' as const,
  taskListName: 'test-list'
};

// Helper function to render component with context provider
const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <NotificationProvider>
    <TaskProvider>
      {ui}
    </TaskProvider>
    </NotificationProvider>
  );
};

describe('TaskItem Component', () => {
  test('renders task information correctly', () => {
    renderWithProvider(<TaskItem task={mockTask} />);
    
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    
    const statusElement = screen.getByTestId('task-status');
    expect(statusElement).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  test('has a working delete button', () => {
    renderWithProvider(<TaskItem task={mockTask} />);
    
    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);
  });
});

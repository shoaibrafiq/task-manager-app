import React from 'react';
import TaskListPage from '../components/TaskListPage';

/**
 * ToDoPage displays all tasks with "To Do" status
 * Uses the shared TaskListPage component to reduce code duplication
 */
const ToDoTasks: React.FC = () => {
  return (
    <TaskListPage
      status="To Do"
      title="To Do Tasks"
      subtitle="Total tasks"
      emptyMessage="No tasks to do."
      paperColor="#f0f5ff"
    />
  );
};

export default ToDoTasks;
import React from 'react';
import TaskListPage from '../components/TaskListPage';

/**
 * DoneTasks displays all tasks with "Done" status
 * Uses the shared TaskListPage component to reduce code duplication
 */
const DoneTasks: React.FC = () => {
  return (
    <TaskListPage
      status="Done"
      title="Completed Tasks"
      subtitle="Total completed"
      emptyMessage="No completed tasks."
      paperColor="#f0fff5"
    />
  );
};

export default DoneTasks;
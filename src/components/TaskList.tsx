import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useTaskContext } from '../contexts/TaskContext';

interface TaskListProps {
  taskListName: string;
  title: string;
}

/**
 * TaskList component to display a list of tasks with a form to add new tasks
 * Demonstrates component composition - a React best practice
 */
const TaskList: React.FC<TaskListProps> = ({ taskListName, title }) => {
  const { getTasksByList } = useTaskContext();
  const tasks = getTasksByList(taskListName);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: 320, 
        p: 2, 
        m: 1, 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        borderRadius: 2
      }}
    >
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Tasks: {tasks.length}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <TaskForm taskListName={taskListName} />
      
      <Box sx={{ mt: 2, overflow: 'auto', maxHeight: '60vh' }}>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
            No tasks added.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default TaskList;

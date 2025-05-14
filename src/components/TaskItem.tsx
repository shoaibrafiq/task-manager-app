import React, { useCallback } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  IconButton, 
  Box, 
  SelectChangeEvent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task, TaskStatus } from '../types/Task';
import { useTaskContext } from '../contexts/TaskContext';

interface TaskItemProps {
  task: Task;
}

/**
 * TaskItem component to display individual task information
 * Uses MUI components for consistent design
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { removeTask, updateTaskStatus } = useTaskContext();

  const handleStatusChange = useCallback((event: SelectChangeEvent) => {
    updateTaskStatus(task.id, event.target.value as TaskStatus);
  }, [task.id, updateTaskStatus]);

  const handleDelete = useCallback(() => {
    removeTask(task.id);
  }, [task.id, removeTask]);

  return (
    <Card sx={{ 
      mb: 2, 
      bgcolor: task.status === 'Done' ? '#f0f7f0' : '#fff',
      transition: 'background-color 0.3s'
    }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={task.status}
              onChange={handleStatusChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Task status' }}
              data-testid="task-status"
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          
          <IconButton 
            aria-label="delete"
            onClick={handleDelete}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(TaskItem);

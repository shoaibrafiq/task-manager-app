import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { useTaskContext } from '../contexts/TaskContext';

interface TaskFormProps {
  taskListName: string;
}

/**
 * TaskForm component for adding new tasks
 * Uses controlled form inputs - a React best practice
 */
const TaskForm: React.FC<TaskFormProps> = ({ taskListName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation to ensure required fields are filled
    if (!title.trim() || !description.trim()) return;
    
    // Use the context to add the task
    addTask({
      title,
      description,
      status: 'To Do',
      taskListName
    });
    
    // Reset form fields after submission
    setTitle('');
    setDescription('');
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          size="small"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          size="small"
        />
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          fullWidth
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;

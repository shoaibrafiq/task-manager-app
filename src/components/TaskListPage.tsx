import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import TaskItem from './TaskItem';
import { useTaskContext } from '../contexts/TaskContext';
import { TaskStatus } from '../types/Task';

interface TaskListPageProps {
  status: TaskStatus;
  title: string;
  subtitle: string;
  emptyMessage: string;
  paperColor: string;
}

/**
 * Reusable component for displaying task lists by status
 */
const TaskListPage: React.FC<TaskListPageProps> = ({
  status,
  title,
  subtitle,
  emptyMessage,
  paperColor
}) => {
  const { getTasksByStatus } = useTaskContext();
  const tasks = getTasksByStatus(status);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: paperColor }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {title}
        </Typography>
        
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          {subtitle}: {tasks.length}
        </Typography>
        
        {tasks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              {emptyMessage}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {tasks.map(task => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <TaskItem task={task} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default React.memo(TaskListPage);

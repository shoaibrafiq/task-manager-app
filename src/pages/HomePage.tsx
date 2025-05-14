import React from 'react';
import { Container, Box } from '@mui/material';
import TaskList from '../components/TaskList';

/**
 * HomePage component displays all task lists
 * Uses flexbox for responsive layout
 */
const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3
        }}
      >
        <TaskList taskListName="shopping-list" title="Shopping List" />
        <TaskList taskListName="work-tasks" title="Work Tasks" />
        <TaskList taskListName="home-tasks" title="Home Tasks" />
      </Box>
    </Container>
  );
};

export default HomePage;

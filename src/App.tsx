import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { theme } from './theme/theme';
import { TaskProvider } from './contexts/TaskContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ToDoTasks from './pages/ToDoPage';
import DoneTasks from './pages/DoneTasksPage';

/**
 * Main App component that sets up routing and global providers
 * 
 * - TaskProvider for state management
 * - ThemeProvider for consistent styling
 * - React Router for navigation
 * - ErrorBoundary for graceful error handling
 * - NotificationProvider for user feedback
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <TaskProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                  <ErrorBoundary>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/to-do" element={<ToDoTasks />} />
                      <Route path="/done" element={<DoneTasks />} />
                    </Routes>
                  </ErrorBoundary>
                </Container>
                <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
                  Task Manager App
                </Box>
              </Box>
            </BrowserRouter>
          </ThemeProvider>
        </TaskProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
};

export default App;
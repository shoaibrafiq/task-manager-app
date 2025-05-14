## Task Management App

A modern React application for managing tasks across different categories. This application demonstrates best practices in React development including proper component architecture, state management, and responsive design.

## Features

- Create, update, and delete tasks
- Organise tasks in different lists (Shopping, Work, Home)
- Filter tasks by status (To Do, Done)
- Responsive Material UI design
- Notifications for operation feedback
- Error handling with user-friendly messages
- Error boundaries to prevent app crashes
- Performance optimised with React.memo and memoisation techniques for scalability and maintainability 

## Tech Stack

- React with functional components and hooks
- TypeScript for type safety and robust interfaces
- Material UI for modern, responsive design
- React Router for navigation
- Context API with useReducer for state management
- Jest & React Testing Library for testing
- Error Boundaries for graceful error handling
- React.memo for performance optimisation

## Project Structure

```
/src
  /components        # Reusable UI components
  /contexts          # Context providers for state management
    /TaskContext     # Task state management with useReducer
    /NotificationContext # Global notification system
  /hooks             # Custom React hooks
  /pages             # Page components
  /services          # Task storage service with error handling
  /types             # TypeScript interfaces and utility types
  /theme             # Material UI theme configuration
  /__tests__         # Test files for UI components, contexts services and types
  /utils             # Utility functions
```

## Best Practices Implemented

- Component Architecture: Using functional components with hooks
- State Management: Context API with useReducer for complex state logic
- Custom Hooks: Extracting reusable logic
- TypeScript: Strong typing with enhanced interfaces and utility types
- Material UI: Consistent design system
- Code Reusability: Shared components to reduce duplication
- Immutable State Updates: Consistent patterns for state modifications
- Error Handling: Comprehensive error handling with user feedback
- Performance Optimisation: React.memo, useCallback, and useMemo
- Testable Code: Components designed for testability
- Responsive Design: Works on various screen sizes

## Architecture Improvements

- TaskContext with useReducer: More predictable state management
- Notification System: Global feedback mechanism for user actions
- Error Boundaries: Graceful error handling to prevent app crashes
- Shared TaskListPage Component: Reduced code duplication between pages
- Enhanced TypeScript Types: Improved type safety with utility types
- optimised Renders: memoisation to prevent unnecessary rerenders

## Future Improvements

- Add user authentication using something like JWT auth
- Replace localStorage with a backend service (Firebase, REST API, GraphQL)
- Form validation is basic could implement Yup schema
- Can use a form library like Formik
- Add tests for user workflows using something like Storybook
- Task Edit functionality
- Implement task priority levels
- A search facility/ filtering for tasks
- Paginantion or a show more button for long list of tasks
- Add drag-and-drop functionality
- Implement offline support with service workers
- For more complex state, migrate from Context API to Redux Toolkit, which has better optimisation for larger applications and more scalable
- Implement React.lazy and Suspense for component-level code splitting. Load page components only when needed
- Add request caching with libraries like react-query to reduce redundant API calls
- Implement batching for multiple state updates that happen simultaneously

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

Install the required modules:

```bash
npm install
# or
yarn
```

### Running the Application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

### Testing

```bash
npm run test
# or
yarn test
```

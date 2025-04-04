import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { DoneTasks } from './DoneTasksPage';
import TaskList, { Action } from './Tasks';
import { ToDoTasks } from './ToDoPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h4 style={{ fontSize: '36px' }}>My lists</h4>
          <Action actionType={'link'} href={window.location.href}>Click here to refresh page!</Action>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <Link to="/" style={{ padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', textDecoration: 'none', color: '#333' }}>Home</Link>
          <Link to="/to-do" style={{ padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', textDecoration: 'none', color: '#333' }}>To Do</Link>
          <Link to="/done" style={{ padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px', textDecoration: 'none', color: '#333' }}>Done</Link>
        </div>
          </div>

        <Routes>
          <Route path="/" element={
            <div className="App" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '40px' }}>
              <TaskList taskListName="shopping-list" title="Shopping list" />
              <TaskList taskListName="work-tasks" title="Work tasks" />
              <TaskList taskListName="home-tasks" title="Home tasks" />
            </div>
          } />
          <Route path="/to-do" element={<ToDoTasks />} />
          <Route path="/done" element={<DoneTasks />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
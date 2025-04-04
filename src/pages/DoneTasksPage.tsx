/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { Task } from "./Tasks";

export const DoneTasks: React.FC = () => {
    const [tasks, setTasks] = useState<any>([]);
  
      useEffect(() => {
          const storedTasks = localStorage.getItem('tasks');
          if (storedTasks) {
              const parsedTasks = JSON.parse(storedTasks);
              const filteredTasks = parsedTasks.filter((task: Task) => task.status === "Done");
              setTasks(filteredTasks);
          } else {
              setTasks([]);
          }
      }, []);
  
    const taskCount = useMemo(() => {
      return tasks.length;
    }, [tasks]);
  
    return (
      <div style={{ backgroundColor: 'darkseagreen', padding: '20px', margin: '10px', borderRadius: '5px', width: '300px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
        <div style={{marginBottom: '20px', textAlign: 'center', color: 'white' }}>
          <h4 style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Done Tasks</h4>
          <p style={{ fontSize: '0.9em' }}>Total tasks: {taskCount}</p>
        </div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task: Task) => (
            <li key={task.id} style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', marginBottom: '5px', border: '1px solid #eee' }}>
              <h2 style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '5px', color: '#555' }}>{task.title}</h2>
              <p style={{ fontSize: '0.9em', color: '#555' }}>{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
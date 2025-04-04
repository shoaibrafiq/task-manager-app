/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';

export interface Task {
  id: any;
  title: any;
  description: any;
  status: any;
  taskListName: any;
}

interface ActionProps {
    actionType?: 'button' | 'link';
    href?: string;
    onClick?: () => void;
    color?: string;
    children: React.ReactNode;
}

export const Action: React.FC<ActionProps> = ({ actionType, href, color, onClick, children }) => {
    if (actionType === 'link') {
        return <a href={href} style={{ textDecoration: 'none', color: color || 'orange' }}>{children}</a>;
    } else {
        return (
          <div onClick={onClick} style={{ border: '1px solid', borderColor: color || 'black', padding: '5px', width: '70px', color: color || 'black' }}>
            {children}
          </div>
        );
    }
};

interface TaskListProps {
  taskListName: any;
  title: any;
}

const TaskList: React.FC<TaskListProps> = ({ taskListName, title }) => {
  const [tasks, setTasks] = useState<any>([]);
  const [titleInput, setTitleInput] = useState<any>('');
  const [description, setDescription] = useState<any>('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      const filteredTasks = parsedTasks.filter((task: Task) => task.taskListName === taskListName);
      setTasks(filteredTasks);
    }
  }, [taskListName]);

  useEffect(() => {
    setTitleInput('');
    setDescription('');
  }, [tasks, taskListName]);

  const generateId = (): any => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const addTask = (): void => {
    if (!titleInput || !description) {
      return;
    }

    const newTask: Task = {
      id: generateId(),
      title: titleInput,
      description: description,
      status: 'To Do',
      taskListName: taskListName,
    };

    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    const otherTasks = allTasks.filter(task => task.taskListName !== taskListName);
    const currentTasks = tasks;
    
    const combinedTasks = [...otherTasks, ...currentTasks, newTask];
    console.log('Combined tasks:', combinedTasks);
    localStorage.setItem('tasks', JSON.stringify(combinedTasks));
    setTasks([...tasks, newTask]);

  };

  const removeTask = (id: any): void => {
    const updatedTasks: any = [];
    for (let i = 0; i < tasks.length; i++) {
        const task: Task = tasks[i];
        if (task.id !== id) {
            updatedTasks.push(task);
        }
    }
    const storedTasks: any = localStorage.getItem('tasks');
    if (storedTasks) {
      const allTasks: any[] = JSON.parse(storedTasks);
      const taskIndex: any = allTasks.findIndex((task: Task) => task.id === id);
        if (taskIndex !== -1) {
            allTasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(allTasks));
        }
    }
    setTasks(updatedTasks);
  };

  const setTaskStatus = (taskId: any, newStatus: any) => {
    const storedTasks: any = localStorage.getItem('tasks');
    if (storedTasks) {
      const allTasks: any[] = JSON.parse(storedTasks);
      const taskIndex: any = allTasks.findIndex((task: Task) => task.id === taskId);

      if (taskIndex !== -1) {
        const taskToUpdate: Task = allTasks[taskIndex];
        taskToUpdate.status = newStatus;

        localStorage.setItem('tasks', JSON.stringify(allTasks));

        setTasks([...tasks]);
      }
    }
  };

  const taskCount = useMemo(() => {
    console.log('Calculating task count');
    return tasks.length;
  }, [tasks]);

  const handleChange = (e: any, setter: any) => {
    setter(e.target.value);
  };


  return (
    <div style={{ backgroundColor: 'darkgray', padding: '20px', margin: '10px', borderRadius: '5px', width: '300px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
      <div style={{marginBottom: '20px', textAlign: 'center', color: 'white' }}>
        <h4>{title}</h4>
        <p>Total tasks: {taskCount}</p>
      </div>

      <div style={{margin: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={titleInput}
          onChange={(e) => handleChange(e, setTitleInput)}
          placeholder="Title"
          style={{ padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
        />
        <textarea
          value={description}
          onChange={(e) => handleChange(e, setDescription)}
          placeholder="Description"
          style={{ padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
        />
        <Action onClick={addTask}>Add Task</Action>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task: Task) => (
          <li key={task.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', marginBottom: '5px', border: '1px solid #eee' }}>
            <h2 style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '5px', color: '#555' }}>{task.title}</h2>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Description: {task.description}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Status: {task.status}</p>
        <select
              onChange={(e: any) => setTaskStatus(task.id, e.target.value)}
              defaultValue={task.status}
              style={{ marginTop: '10px', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}

            >
              <option value="To Do">To Do</option>
              <option value="Done">Done</option>
            </select>
            <Action onClick={() => removeTask(task.id)}>Remove</Action>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
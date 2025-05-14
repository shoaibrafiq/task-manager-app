// Using string literal types for better type safety
export type TaskStatus = 'To Do' | 'Done';
export type TaskListName = 'shopping-list' | 'work-tasks' | 'home-tasks' | string;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  taskListName: TaskListName;
  createdAt?: Date;
}

// Utility types for better type safety
export type TaskWithoutId = Omit<Task, 'id'>;
export type TaskCreationData = Omit<Task, 'id' | 'createdAt'>;
export type TaskUpdateData = Partial<Omit<Task, 'id' | 'taskListName'>>;

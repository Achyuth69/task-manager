import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (title) => {
    const res = await createTask({ title });
    setTasks([...tasks, res.data]);
  };

  const toggleComplete = async (task) => {
    const res = await updateTask(task._id, { completed: !task.completed });
    setTasks(tasks.map(t => t._id === task._id ? res.data : t));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} removeTask={removeTask} />
    </div>
  );
}

export default App;

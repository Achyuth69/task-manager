import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { getTasks, deleteTask } from "../api/taskService";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [totalPages, setTotalPages] = useState(1);

  const fetch = async () => {
    try {
      const data = await getTasks(page, filter);
      setTasks(data.tasks || data);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [page, filter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await deleteTask(id);
    fetch();
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "20px 40px",
          textAlign: "left",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2>Your Tasks</h2>

        <TaskForm onTaskAdded={fetch} />
        <TaskList tasks={tasks} onDelete={handleDelete} />
      </div>
    </>
  );
}

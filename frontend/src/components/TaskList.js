import React from "react";

export default function TaskList({ tasks, onDelete }) {
  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id} style={{ marginBottom: "10px" }}>
          <b>{task.title}</b> — {task.priority} —{" "}
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

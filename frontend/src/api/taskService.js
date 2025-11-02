import API from "./axiosInstance";

// 🔹 Fetch tasks with pagination (10 per page)
export const getTasks = (page = 1, filter = {}) =>
  API.get("/tasks", { params: { page, limit: 10, ...filter } })
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching tasks:", err);
      throw err;
    });

export const createTask = (task) =>
  API.post("/tasks", task)
    .then(res => res.data)
    .catch(err => {
      console.error("Error creating task:", err);
      throw err;
    });

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data)
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating task:", err);
      throw err;
    });

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting task:", err);
      throw err;
    });

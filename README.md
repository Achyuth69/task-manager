# 📝 MERN Task Manager

A full-stack **Task Management Application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This app allows users to create, view, update, and delete tasks in a simple and intuitive interface.

---

## 🚀 Tech Stack

**Frontend:** React.js  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Atlas / Local)  
**Version Control:** Git & GitHub  
**Deployment:** Render (backend) + Netlify (frontend)

---

## 📁 Project Structure

```
mern-task-manager/
│
├── backend/
│   ├── server.js                # Entry point for backend
│   ├── package.json             # Backend dependencies
│   ├── routes/
│   │   └── taskRoutes.js        # API routes for tasks
│   ├── models/
│   │   └── Task.js              # Task Mongoose schema
│   └── controllers/
│       └── taskController.js    # Controller logic for tasks
│
└── frontend/
    ├── package.json             # Frontend dependencies
    ├── public/
    │   └── index.html           # Main HTML file
    └── src/
        ├── App.js               # Main React component
        ├── index.js             # React entry point
        ├── api/
        │   └── taskApi.js       # Axios API calls
        └── components/
            ├── TaskList.js      # Task listing UI
            └── TaskForm.js      # Task creation/edit form
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
```

### 2️⃣ Install backend dependencies
```bash
cd backend
npm install
```

### 3️⃣ Install frontend dependencies
```bash
cd ../frontend
npm install
```

---

## 🧠 Environment Variables

Create a `.env` file in the **backend** folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

*(Replace with your own MongoDB URI — e.g. from MongoDB Atlas)*

---

## ▶️ Run the Application

### Run Backend
```bash
cd backend
npm start
```

### Run Frontend
```bash
cd frontend
npm start
```

Frontend will start on [http://localhost:3000](http://localhost:3000)  
Backend will run on [http://localhost:5000](http://localhost:5000)

---

## 🧩 API Endpoints

| Method | Endpoint         | Description        |
|:------:|:-----------------|:------------------|
| GET    | /api/tasks       | Get all tasks     |
| POST   | /api/tasks       | Create new task   |
| PUT    | /api/tasks/:id   | Update a task     |
| DELETE | /api/tasks/:id   | Delete a task     |

---

## 🌐 Deployment

### Backend (Render)
1. Create a new **Render Web Service**
2. Connect your GitHub repo
3. Set root directory to `/backend`
4. Add environment variables (`PORT`, `MONGO_URI`)
5. Deploy

### Frontend (Netlify or Vercel)
1. Connect repo to Netlify
2. Set build command:
   ```
   npm run build
   ```
3. Publish directory:
   ```
   frontend/build
   ```

---

## 💡 Features

- Add new tasks 🆕  
- View all tasks 📋  
- Update task status ✏️  
- Delete tasks 🗑️  
- RESTful API backend  
- Responsive React frontend  

---

## 📸 Preview

*(Add screenshots or demo GIFs here if available)*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open a pull request or raise an issue.

---

## 🧑‍💻 Author

**Achyuth Parisha**  
📬 [Your GitHub Profile](https://github.com/Achyuth69)  
📧 achuthparisha005@gmail.com

---

## 📜 License

This project is licensed under the **MIT License**.

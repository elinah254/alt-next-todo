# Todo App – AltSchool Frontend Second Semester Project

A comprehensive Todo App built with **React 19**, demonstrating routing, API integration, state management, and accessibility best practices.

## 🌟 Features

- Fetch and display todos from JSONPlaceholder API
- Client-side pagination (10 per page)
- View individual todo details
- Add new todos (stored locally)
- Search todos by title
- Filter todos by completion status
- Error boundary handling and custom 404 page
- Responsive design (mobile-first)
- Accessible UI with semantic HTML

## 🚀 Live Demo

🔗 [View Deployed App](https://alt-react.vercel.app/)  
📦 [GitHub Repository](https://github.com/elinah254/alt-react.git) 

## 🔧 Tech Stack

- React 19
- React Router v7
- Tanstack Query (React Query)
- Local Storage for persistence
- CSS modules
- JSONPlaceholder API

## 📁 Folder Structure
```bash
mytodo-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddTodo.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Pagination.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── lib/
│   │   └── api.js
│   ├── pages/
│   │   ├── BrokenPage.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── TodoDetail.jsx
│   ├── styles/
│   │   ├── AddTodo.module.css
│   │   ├── Pagination.module.css
│   │   ├── TodoItem.module.css
│   │   ├── TodoList.module.css
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── vercel.json
````


## 📡 API Reference

Base URL: `https://jsonplaceholder.typicode.com`

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/todos`     | Get all todos     |
| GET    | `/todos/:id` | Get a single todo |
| POST   | `/todos`     | Add a new todo    |
| PUT    | `/todos/:id` | Update a todo     |
| DELETE | `/todos/:id` | Delete a todo     |

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/yourusername/todo-app.git
cd todo-app

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 🧪 Available Scripts

* `npm run dev` – Start development server
* `npm run build` – Build for production
* `npm run preview` – Preview production build


```


## 🙏 Acknowledgments

Built as part of the **AltSchool Frontend Engineering – Second Semester Exam**
Instructor: [@Oluwasetemi](https://github.com/Oluwasetemi)


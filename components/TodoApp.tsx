"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const todosPerPage = 20;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const demoTodos = res.data.slice(0, 100).map((p: any) => ({
          id: p.id.toString(),
          text: p.title,
          completed: Math.random() > 0.7,
        }));
        setTodos(demoTodos);
      } catch (error) {
        console.error("Error loading todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    setTodos((prev) => [
      { id: Date.now().toString(), text, completed: false },
      ...prev,
    ]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const markAllDone = () => {
    setTodos((prev) => prev.map((t) => ({ ...t, completed: true })));
  };

  const deleteAll = () => {
    setTodos([]);
  };

  const filtered = todos.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.completed;
    return t.completed;
  });

  const totalPages = Math.ceil(filtered.length / todosPerPage);
  const startIndex = (page - 1) * todosPerPage;
  const paginatedTodos = filtered.slice(startIndex, startIndex + todosPerPage);

//   if (loading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center text-lg text-indigo-700 bg-gradient-to-br from-[#eaf3ff] to-[#ffe9f3]">
//         Loading tasks...
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf3ff] via-[#fff0f5] to-[#f7e9ff] flex justify-center items-center p-8">
      <div className="backdrop-blur-md bg-[#ffffffb3] text-[#3d2c54] rounded-3xl shadow-2xl p-10 w-full max-w-4xl border border-white/60">
        <h1 className="text-4xl font-semibold mb-6 text-center text-[#6a3cb0] drop-shadow-sm">
          My To-Do List 💫
        </h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-[#d5c6ff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c1a3ff] bg-[#f9f5ff]"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-[#9f79ff] to-[#d07bff] hover:from-[#a87fff] hover:to-[#d78aff] text-white font-medium rounded-md shadow-md hover:shadow-lg transition"
          >
            Add
          </button>
        </form>

        <div className="flex items-center justify-between mb-4 text-sm flex-wrap">
          <div className="flex gap-2">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f as any);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-md transition ${
                  filter === f
                    ? "bg-gradient-to-r from-[#8f5fff] to-[#c075ff] text-white"
                    : "bg-[#ede3ff] hover:bg-[#e0d3ff] text-[#5d3da0]"
                }`}
              >
                {f[0].toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <span className="text-[#6b579c]">
            {todos.filter((t) => !t.completed).length} left
          </span>
        </div>

        <ul className="divide-y divide-[#e6d8ff]">
          {paginatedTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between py-3 px-2 hover:bg-[#f1e8ff] rounded-md transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 accent-[#a77bff]"
                />
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-[#a48ad8]"
                      : "text-[#3f306d]"
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-[#e77291] hover:text-[#ff4d78] text-sm transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-between items-center mt-6 gap-3 text-sm">
          <button
            onClick={clearCompleted}
            className="px-3 py-1 bg-[#ede3ff] hover:bg-[#e0d3ff] text-[#5d3da0] rounded-md transition"
          >
            Clear Completed
          </button>
          <button
            onClick={markAllDone}
            className="px-3 py-1 bg-gradient-to-r from-[#7bd68b] to-[#57c774] hover:from-[#6ed07e] hover:to-[#47b869] text-white rounded-md transition"
          >
            Mark All Done
          </button>
          <button
            onClick={deleteAll}
            className="px-3 py-1 bg-gradient-to-r from-[#ff7f8a] to-[#ff4b63] hover:from-[#ff6a78] hover:to-[#f93354] text-white rounded-md transition"
          >
            Delete All
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-8 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${
              page === 1
                ? "bg-[#f5ebff] text-[#b6a7d7] cursor-not-allowed"
                : "bg-[#ede3ff] hover:bg-[#e0d3ff] text-[#5d3da0] transition"
            }`}
          >
            Previous
          </button>
          <span className="text-[#6a3cb0] font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md ${
              page === totalPages
                ? "bg-[#f5ebff] text-[#b6a7d7] cursor-not-allowed"
                : "bg-[#ede3ff] hover:bg-[#e0d3ff] text-[#5d3da0] transition"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}










// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// type Todo = {
//   id: string;
//   text: string;
//   completed: boolean;
// };

// export default function TodoApp() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [text, setText] = useState("");
//   const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const todosPerPage = 20;

//   // Auto-load todos from API
//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//         const demoTodos = res.data.slice(0, 100).map((p: any) => ({
//           id: p.id.toString(),
//           text: p.title,
//           completed: Math.random() > 0.7,
//         }));
//         setTodos(demoTodos);
//       } catch (error) {
//         console.error("Error loading todos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTodos();
//   }, []);

//   const addTodo = (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!text.trim()) return;
//     setTodos((prev) => [
//       { id: Date.now().toString(), text, completed: false },
//       ...prev,
//     ]);
//     setText("");
//   };

//   const toggleTodo = (id: string) => {
//     setTodos((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
//     );
//   };

//   const deleteTodo = (id: string) => {
//     setTodos((prev) => prev.filter((t) => t.id !== id));
//   };

//   const clearCompleted = () => {
//     setTodos((prev) => prev.filter((t) => !t.completed));
//   };

//   const markAllDone = () => {
//     setTodos((prev) => prev.map((t) => ({ ...t, completed: true })));
//   };

//   const deleteAll = () => {
//     setTodos([]);
//   };

//   const filtered = todos.filter((t) => {
//     if (filter === "all") return true;
//     if (filter === "active") return !t.completed;
//     return t.completed;
//   });

//   const totalPages = Math.ceil(filtered.length / todosPerPage);
//   const startIndex = (page - 1) * todosPerPage;
//   const paginatedTodos = filtered.slice(startIndex, startIndex + todosPerPage);

//   if (loading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center text-lg text-blue-700 bg-gradient-to-br from-blue-50 to-pink-100">
//         Loading tasks...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 flex justify-center items-center p-8">
//       <div className="backdrop-blur-md bg-white/70 text-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-4xl border border-white/50 transition hover:shadow-pink-200">
//         <h1 className="text-4xl font-semibold mb-6 text-center text-blue-600 drop-shadow-sm">
//           My To-Do List 🌸
//         </h1>

//         <form onSubmit={addTodo} className="flex gap-2 mb-6">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Add a new task..."
//             className="flex-1 px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/70"
//           />
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md hover:shadow-lg transition"
//           >
//             Add
//           </button>
//         </form>

//         <div className="flex items-center justify-between mb-4 text-sm flex-wrap">
//           <div className="flex gap-2">
//             {["all", "active", "completed"].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => {
//                   setFilter(f as any);
//                   setPage(1);
//                 }}
//                 className={`px-3 py-1 rounded-md transition ${
//                   filter === f
//                     ? "bg-blue-500 text-white"
//                     : "bg-blue-100 hover:bg-blue-200 text-blue-700"
//                 }`}
//               >
//                 {f[0].toUpperCase() + f.slice(1)}
//               </button>
//             ))}
//           </div>
//           <span className="text-gray-600">
//             {todos.filter((t) => !t.completed).length} left
//           </span>
//         </div>

//         <ul className="divide-y divide-blue-100">
//           {paginatedTodos.map((todo) => (
//             <li
//               key={todo.id}
//               className="flex items-center justify-between py-3 px-2 hover:bg-blue-50/70 rounded-md transition"
//             >
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={todo.completed}
//                   onChange={() => toggleTodo(todo.id)}
//                   className="w-4 h-4 accent-blue-500"
//                 />
//                 <span
//                   className={`${
//                     todo.completed
//                       ? "line-through text-blue-400"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {todo.text}
//                 </span>
//               </div>
//               <button
//                 onClick={() => deleteTodo(todo.id)}
//                 className="text-red-400 hover:text-red-600 text-sm transition"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>

//         <div className="flex flex-wrap justify-between items-center mt-6 gap-3 text-sm">
//           <button
//             onClick={clearCompleted}
//             className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-700 transition"
//           >
//             Clear Completed
//           </button>
//           <button
//             onClick={markAllDone}
//             className="px-3 py-1 bg-green-400 hover:bg-green-500 text-white rounded-md transition"
//           >
//             Mark All Done
//           </button>
//           <button
//             onClick={deleteAll}
//             className="px-3 py-1 bg-red-400 hover:bg-red-500 text-white rounded-md transition"
//           >
//             Delete All
//           </button>
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex justify-center gap-4 mt-8 text-sm">
//           <button
//             onClick={() => setPage((p) => Math.max(p - 1, 1))}
//             disabled={page === 1}
//             className={`px-4 py-2 rounded-md ${
//               page === 1
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
//             }`}
//           >
//             Previous
//           </button>
//           <span className="text-blue-600">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//             disabled={page === totalPages}
//             className={`px-4 py-2 rounded-md ${
//               page === totalPages
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";

import React from "react";
import TodoApp from "../components/TodoApp";

export default function TodosPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <TodoApp />
    </main>
  );
}







// "use client";

// import React, { useState, useEffect } from "react";

// export default function HomePage() {
//   const [markdownList, setMarkdownList] = useState<any[]>([]);
//   const [newPost, setNewPost] = useState({ title: "", content: "" });

//   // Load markdown content from API
//   useEffect(() => {
//     const fetchMarkdown = async () => {
//       try {
//         const res = await fetch("/api/markdown");
//         const data = await res.json();
//         setMarkdownList(data);
//       } catch (err) {
//         console.error("Failed to load:", err);
//       }
//     };
//     fetchMarkdown();
//   }, []);

//   // Save new markdown content
//   const handleSave = async () => {
//     if (!newPost.title || !newPost.content) return;
//     try {
//       const res = await fetch("/api/markdown", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newPost),
//       });
//       const data = await res.json();
//       alert("Saved successfully!");
//       setMarkdownList((prev) => [data, ...prev]);
//       setNewPost({ title: "", content: "" });
//     } catch (err) {
//       console.error("Failed to save:", err);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Markdown API Demo</h1>

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Title"
//           className="w-full border p-2 mb-2 rounded"
//           value={newPost.title}
//           onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//         />
//         <textarea
//           placeholder="Write markdown content..."
//           className="w-full border p-2 mb-2 rounded h-24"
//           value={newPost.content}
//           onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//         />
//         <button
//           onClick={handleSave}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Save
//         </button>
//       </div>

//       <ul className="space-y-4">
//         {markdownList.map((item) => (
//           <li key={item.id} className="border rounded p-3">
//             <h2 className="font-semibold">{item.title}</h2>
//             <p className="text-gray-700">{item.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

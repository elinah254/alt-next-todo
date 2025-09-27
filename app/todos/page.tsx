"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TodosPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Todos</h1>
      <ul>
        {data.slice(0, 10).map((todo: any) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}




// import React from 'react'
// import TodosList from '../../components/TodosList'

// export default function TodosPage() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Todos</h2>
//       <TodosList />
//     </div>
//   )
// }

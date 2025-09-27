import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=12')
  return res.data
}

export default function TodosList() {
  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">Error loading todos</div>

  return (
    <ul className="space-y-2">
      {data?.map(todo => (
        <li key={todo.id} className="p-3 bg-gray-100 dark:bg-gray-800 rounded flex justify-between items-center">
          <div>
            <div className={todo.completed ? 'line-through text-gray-400' : ''}>{todo.title}</div>
            <div className="text-sm text-gray-500">ID: {todo.id}</div>
          </div>
          <div>
            <input type="checkbox" checked={todo.completed} readOnly />
          </div>
        </li>
      ))}
    </ul>
  )
}

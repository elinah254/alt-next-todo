import React from 'react'
import TodosList from '../../components/TodosList'

export default function TodosPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Todos</h2>
      <TodosList />
    </div>
  )
}

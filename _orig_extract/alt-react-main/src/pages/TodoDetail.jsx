import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTodoById } from '../lib/api';

function TodoDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodoById(id),
    retry: false,
  });

  // Fallback: check localStorage if no data from API
  const localTodos = JSON.parse(localStorage.getItem('localTodos')) || [];
  const localTodo = localTodos.find(todo => String(todo.id) === id);

  const todo = data?.id ? data : localTodo;

  if (isLoading) return <p>Loading...</p>;
  if (!todo) return <p>Todo not found</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Todo Detail</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
      <p><strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}</p>
      {todo.description && (
        <p><strong>Description:</strong> {todo.description}</p>
      )}
    </div>
  );
}

export default TodoDetail;

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../lib/api';
import TodoList from '../components/TodoList';
import Pagination from '../components/Pagination';
import AddTodo from '../components/AddTodo';
import { toast } from 'react-toastify';
//import { ThemeContext } from '../components/ThemeContext';

function Home() {
  const [page, setPage] = useState(1);
  const [localTodos, setLocalTodos] = useState(() => {
    try {
      const stored = localStorage.getItem('localTodos');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse localTodos:', error);
      localStorage.removeItem('localTodos');
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const {
    data: remoteTodos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchTodos(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    localStorage.setItem('localTodos', JSON.stringify(localTodos));
  }, [localTodos]);

  const handleAddTodo = ({ title, description }) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setLocalTodos((prev) => [newTodo, ...prev]);
    toast.success('New todo added!');
  };

  const handleToggleComplete = (id) => {
    const todoToUpdate = localTodos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedCompleted = !todoToUpdate.completed;

    setLocalTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: updatedCompleted } : todo
      )
    );

    toast.info(
      updatedCompleted ? 'Marked as completed ✅' : 'Marked as incomplete ⏳'
    );
  };

  const handleDeleteTodo = (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.info('Todo deleted');
    }
  };

  const handleEditTodo = (id, updatedData) => {
    setLocalTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updatedData } : todo
      )
    );
    toast.success('Todo updated!');
  };

  const combinedTodos = [...localTodos, ...remoteTodos];

  const filteredTodos = combinedTodos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && todo.completed) ||
      (statusFilter === 'incomplete' && !todo.completed);
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching todos</p>;

  return (
    <main style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Todo App</h1>

      <AddTodo onAdd={handleAddTodo} />

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem' }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '0.5rem', width: '100%' }}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
      />

      <Pagination page={page} setPage={setPage} />
    </main>
  );
}

export default Home;

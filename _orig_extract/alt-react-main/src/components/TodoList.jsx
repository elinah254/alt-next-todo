import TodoItem from './TodoItem';
import styles from '../styles/TodoList.module.css';

function TodoList({ todos, onToggleComplete, onDelete, onEdit }) {
  return (
    <ul className={styles.list}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit} // ✅ This line was missing
        />
      ))}
    </ul>
  );
}

export default TodoList;


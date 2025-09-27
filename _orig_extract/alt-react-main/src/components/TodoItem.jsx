import { useState } from 'react';
import styles from '../styles/TodoItem.module.css';
import { Link } from 'react-router-dom';

function TodoItem({ todo, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete?.(todo.id)}
        />

        {isEditing ? (
          <div className={styles.editArea}>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={styles.editInput}
              placeholder="Edit title"
            />
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className={styles.editInput}
              placeholder="Edit description"
            />
          </div>
        ) : (
          <div>
            <Link to={`/todos/${todo.id}`} className={styles.title}>
              {todo.title}
            </Link>
          
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className={styles.editButton} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className={styles.deleteButton} onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;

import React from 'react';

interface Props {
    todo: Todo;
    toggleTodo: ToggleTodo;
}

export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo }) => {
    return (
        <li>
        <label
          style={{ textDecoration: todo.complete ? 'line-through' : undefined }}
        >
          <input
          type="checkbox"
          onChange={() => toggleTodo(todo)}
          checked={todo.complete}
        />{' '}
        {todo.text}
        </label>
      </li>
    );
}
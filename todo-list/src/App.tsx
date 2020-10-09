import React, { useState } from 'react';
import { TodoListItem } from './TodoListItem';

const initialTodos: Todo[] = [
  {
    text: 'Walk the dog',
    complete: false,
  },
  {
    text: 'Write app',
    complete: true,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    console.log(newTodos);
    setTodos(newTodos);
  };

  return (
    <div>
      <ul>
        <TodoListItem todo={initialTodos[0]} toggleTodo={toggleTodo} />
        <TodoListItem todo={initialTodos[1]} toggleTodo={toggleTodo} />
      </ul>
    </div>
  );
}

export default App;

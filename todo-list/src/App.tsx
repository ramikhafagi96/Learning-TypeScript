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
  return (
    <div>
      <ul>
        <TodoListItem todo={initialTodos[0]} />
        <TodoListItem todo={initialTodos[1]} />
      </ul>
    </div>
  );
}

export default App;

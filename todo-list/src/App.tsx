import React from 'react';
import { TodoListItem } from './TodoListItem';

const todos: Todo[] = [
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
  return (
    <div>
      <ul>
        <TodoListItem todo={todos[0]} />
        <TodoListItem todo={todos[1]} />
      </ul>
    </div>
  );
}

export default App;

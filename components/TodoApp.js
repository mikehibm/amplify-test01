import { useReducer } from 'react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { initialState, todoReducer } from '../services/todo-reducer';

export const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <div className="todoapp">
      <h2>Todo List</h2>
      <TodoInput dispatch={dispatch} />
      <ul className="list">
        {state.todos.map((i) => (
          <TodoItem key={i.id} item={i} dispatch={dispatch} />
        ))}
      </ul>
      <style jsx>{`
        .todoapp {
          padding: 0.4em;
          /* border: 1px solid pink; */
        }

        .list {
          padding-left: 0;
          /* border: 1px solid #eaa; */
        }
      `}</style>
    </div>
  );
};

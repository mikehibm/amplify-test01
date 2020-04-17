import { useReducer } from 'react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { initialState, todoReducer } from '../services/todo-reducer';
import { useAuthListner } from './UseAuthLisner';

export const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const user = useAuthListner();
  const username = user?.username || '';

  return (
    <div className="todoapp">
      <h2>{username && `${username}'s `}Todoリスト</h2>
      <TodoInput dispatch={dispatch} />
      <ul className="list">
        {state.todos.map((i) => (
          <TodoItem key={i.id} item={i} dispatch={dispatch} />
        ))}
      </ul>
      <style jsx>{`
        .todoapp {
          max-width: 600px;
          padding: 1em;
          margin: auto;
        }

        .list {
          padding-left: 0;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

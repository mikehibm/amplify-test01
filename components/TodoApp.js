import { useEffect, useReducer } from 'react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { initialState, todoReducer } from '../services/todo-reducer';
import { loadTodos } from '../services/todo-service';
import { useAuthListner } from './UseAuthLisner';

export const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const user = useAuthListner();
  const username = user?.username || '';

  let isMounted = true;

  useEffect(() => {
    if (!isMounted) return;
    loadTodos(dispatch, username);
    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <div className="todoapp">
      <h2>{username && `${username}'s `}Todoリスト</h2>
      <TodoInput dispatch={dispatch} />
      <ul className="list">
        {state.todos.map((i) => (
          <TodoItem key={i.id} item={i} dispatch={dispatch} />
        ))}
      </ul>
      {state.loading && <div>Loading...</div>}
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

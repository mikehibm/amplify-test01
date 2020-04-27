import { useEffect, useReducer } from 'react';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';
import { LoadingSpinner } from './LoadingSpinner';
import { initialState, todoReducer } from '../services/todo-reducer';
import { loadTodos } from '../services/todo-service';
import { useAuthListner } from './UseAuthLisner';

export const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, loading, error } = state;

  const user = useAuthListner();
  const username = user?.username || '';

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;
    loadTodos(dispatch);
    return () => (isMounted = false);
  }, [username]);

  console.log({ state });

  return (
    <div className="todoapp">
      <h2>{username && `${username}'s `}Todoリスト</h2>
      <TodoInput dispatch={dispatch} />
      <ul className="list">
        {todos.map((i) => (
          <TodoItem key={i.id} item={i} dispatch={dispatch} />
        ))}
      </ul>
      <LoadingSpinner isLoading={loading} />>
      {error && (
        <div className="error">
          <h4>Error</h4>
          <p>{error.message}</p>
        </div>
      )}
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

        .error {
          color: red;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

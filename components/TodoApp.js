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

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;
    loadTodos(dispatch);
    return () => (isMounted = false);
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
      {state.loading && (
        <div className="loading">
          <img src="/spinner.svg" className="spinner" />
        </div>
      )}
      {state.error && (
        <div className="error">
          <h4>Error</h4>
          <p>{state.error.message}</p>
          {/* <pre>{JSON.stringify(state.error, null, 2)}</pre> */}
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

        .loading {
          position: absolute;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          justify-items: center;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }

        .spinner {
          transform: translateY(-10%);
        }

        .error {
          color: red;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

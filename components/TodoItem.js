import { updateTodo, deleteTodo } from '../services/todo-service';

export const TodoItem = ({ item, dispatch }) => {
  function handleCheck(e) {
    updateTodo(dispatch, { ...item, done: e.currentTarget.checked });
  }

  function handleDelete(e) {
    deleteTodo(dispatch, item);
  }

  return (
    <li className={item.done ? 'done' : ''}>
      <input type="checkbox" checked={item.done} onChange={handleCheck} />
      <span>{item.text}</span>
      <button onClick={handleDelete}>X</button>

      <style jsx>{`
        li {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          column-gap: 0.4rem;
          margin-left: 0;
          margin-bottom: 0.6em;
          list-style: none;
          border-bottom: 1px dashed #aaa;
          font-size: 1.2rem;
        }

        li.done span {
          color: #aaa;
          text-decoration: line-through;
        }

        input[type='checkbox'] {
          position: relative;
          top: 0.3rem;
          cursor: pointer;
        }

        button {
          max-height: 1.8rem;
          color: #444;
          font-size: 1.2rem;
          border-radius: 0.3em;
          cursor: pointer;
        }
      `}</style>
    </li>
  );
};

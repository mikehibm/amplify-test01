import { useEffect, useState, useRef } from 'react';
import { addTodo } from '../services/todo-service';

export const TodoInput = ({ dispatch }) => {
  const [text, setText] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 100);
  }, []);

  function handleChange(e) {
    setText(e.currentTarget.value);
  }

  function handleAdd(e) {
    console.log(e);
    // dispatch({ type: 'add', payload: text });
    addTodo(dispatch, text);
    setText('');
    inputRef.current && inputRef.current.focus();
  }

  return (
    <div className="todoinput">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        ref={inputRef}
        maxLength="80"
      />
      <button onClick={handleAdd} disabled={text === ''}>
        +
      </button>

      <style jsx>{`
        .todoinput {
          display: grid;
          grid-template-columns: 1fr auto;
          column-gap: 0.4rem;
          padding: 0.4em;
        }

        input,
        button {
          font-size: 1.5rem;
          border-radius: 0.3em;
        }

        input {
          border: none;
          border-bottom: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

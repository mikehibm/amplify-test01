export const TodoItem = ({ item, dispatch }) => {
  function handleCheck(e) {
    console.log(e);
    dispatch({
      type: 'updateDone',
      payload: { ...item, done: e.currentTarget.checked },
    });
  }

  function handleDelete(e) {
    console.log({ e });
    dispatch({ type: 'delete', payload: { ...item } });
  }

  return (
    <li className={item.done ? 'done' : ''}>
      <input type="checkbox" checked={item.done} onChange={handleCheck} />
      <span>{item.text}</span>
      <button onClick={handleDelete}>X</button>

      <style jsx>{`
        li {
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
      `}</style>
    </li>
  );
};

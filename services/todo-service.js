export function loadTodos(dispatch, username) {
  if (!username) {
    dispatch({ type: 'loadTodos', payload: [] });
  }

  dispatch({ type: 'beginAsync' });

  const todos = [];

  (async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 3000);
    });

    todos.push({
      owner: 'a123',
      id: Math.floor(Math.random() * 100000),
      text: 'ジョギング10km',
      done: false,
    });

    console.log({ todos });

    dispatch({ type: 'loadTodos', payload: todos });
  })();
}

export function addTodo(dispatch, text) {
  dispatch({ type: 'beginAsync' });

  (async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 3000);
    });

    console.log({ text });

    dispatch({ type: 'add', payload: text });
  })();
}

export function updateTodo(dispatch, todo) {
  dispatch({ type: 'beginAsync' });

  (async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });

    console.log({ todo });

    dispatch({ type: 'update', payload: todo });
  })();
}

export function deleteTodo(dispatch, todo) {
  dispatch({ type: 'beginAsync' });

  (async () => {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });

    console.log({ todo });

    dispatch({ type: 'delete', payload: todo });
  })();
}

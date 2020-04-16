export const initialState = {
  todos: [
    { owner: 'a123', id: '1', text: 'これはテストです', done: false },
    { owner: 'a123', id: '2', text: 'ミルクを買う', done: false },
    { owner: 'a123', id: '3', text: 'ジョギング10km', done: false },
    {
      owner: 'a123',
      id: '4',
      text: 'ブログ用サンプルアプリケーション作成',
      done: false,
    },
  ],
  loading: false,
  error: null,
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return add(state, action.payload);
    case 'updateDone':
      return update(state, action.payload);
    case 'delete':
      return destroy(state, action.payload);
    default:
      throw new Error();
  }
}

function add(state, text) {
  const item = {
    owner: 'a123',
    id: Math.floor(Math.random() * 1000000),
    text,
    done: false,
  };

  return {
    ...state,
    todos: [...state.todos, item],
  };
}

function update(state, item) {
  const newTodos = state.todos.map((i) => {
    if (i.id === item.id) {
      return {
        ...i,
        text: item.text,
        done: item.done,
      };
    }
    return i;
  });

  return {
    ...state,
    todos: newTodos,
  };
}

function destroy(state, item) {
  const newTodos = state.todos.filter((i) => i.id !== item.id);

  return {
    ...state,
    todos: newTodos,
  };
}

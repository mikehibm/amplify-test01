export const initialState = {
  todos: [
    // { id: 'todo:1234-5678', text: 'これはサンプルです', done: false },
  ],
  loading: false,
  error: null,
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'beginAsync':
      return { ...state, loading: true, error: null };
    case 'endAsync':
      return { ...state, loading: false, error: null };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    case 'loadTodos':
      return { ...state, loading: false, todos: action.payload, error: null };
    default:
      throw new Error();
  }
}

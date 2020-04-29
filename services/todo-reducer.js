export const initialState = {
  todos: [
    // { id: 'todo:1234-5678', text: 'これはサンプルです', done: false },
  ],
  loading: false,
  error: null,
  message: null,
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'beginAsync':
      return state.loading ? state : { ...state, loading: true, error: null };
    case 'endAsync':
      return state.loading ? { ...state, loading: false, error: null } : state;
    case 'error':
      return { ...state, loading: false, error: action.payload };
    case 'message':
      return state.message !== action.payload
        ? { ...state, message: action.payload }
        : state;
    case 'loadTodos':
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
        error: null,
        message: action.payload.message,
      };
    default:
      throw new Error();
  }
}

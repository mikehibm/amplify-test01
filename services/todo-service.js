import { API, Auth } from 'aws-amplify';

const apiName = 'amplifytest01api';
const apiPath = '/todos';
const userIdPrefix = 'user:';

const defaultOptions = {
  headers: {},
  response: true,
  // queryStringParameters: {
  //   name: 'param',
  // },
};

export async function loadTodos(dispatch) {
  dispatch({ type: 'beginAsync' });

  const user = await Auth.currentUserInfo();
  console.log({ user });
  if (!user) {
    dispatch({ type: 'loadTodos', payload: [] });
    return;
  }

  try {
    const userId = user.id;
    const path = `${apiPath}/${userIdPrefix}${userId}`;
    const res = await API.get(apiName, path, defaultOptions);
    const todos = res.data;
    console.log(res);

    console.log({ todos });
    dispatch({ type: 'loadTodos', payload: todos });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'error', payload: error });
  }
}

export async function addTodo(dispatch, text) {
  dispatch({ type: 'beginAsync' });

  const user = await Auth.currentUserInfo();
  console.log({ user });
  if (!user) {
    dispatch({ type: 'loadTodos', payload: [] });
    return;
  }

  try {
    const path = `${apiPath}`;
    const options = {
      ...defaultOptions,
      body: {
        text,
        done: false,
      },
    };
    const res = await API.post(apiName, path, options);
    console.log(res);
    await loadTodos(dispatch);
  } catch (error) {
    console.error(error);
    dispatch({ type: 'error', payload: error });
  }
}

export async function updateTodo(dispatch, todo) {
  dispatch({ type: 'beginAsync' });

  const user = await Auth.currentUserInfo();
  console.log({ user });
  if (!user) {
    dispatch({ type: 'loadTodos', payload: [] });
    return;
  }

  try {
    const userId = user.id;
    const path = `${apiPath}/${userIdPrefix}${userId}/${todo.id}`;
    const options = {
      ...defaultOptions,
      body: {
        text: todo.text,
        done: todo.done,
      },
    };
    const res = await API.put(apiName, path, options);
    console.log(res);
    await loadTodos(dispatch);
  } catch (error) {
    console.error(error);
    dispatch({ type: 'error', payload: error });
  }
}

export async function deleteTodo(dispatch, todo) {
  dispatch({ type: 'beginAsync' });

  const user = await Auth.currentUserInfo();
  console.log({ user });
  if (!user) {
    dispatch({ type: 'loadTodos', payload: [] });
    return;
  }

  try {
    const userId = user.id;
    const path = `${apiPath}/${userIdPrefix}${userId}/${todo.id}`;
    const options = {
      ...defaultOptions,
    };
    const res = await API.del(apiName, path, options);
    console.log(res);
    await loadTodos(dispatch);
  } catch (error) {
    console.error(error);
    dispatch({ type: 'error', payload: error });
  }
}

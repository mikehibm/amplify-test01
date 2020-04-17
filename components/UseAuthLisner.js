import { useState, useEffect } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

export function useAuthListner() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', loadUser);
    return () => Hub.remove('auth', loadUser);
  });

  let unmounted = false;
  useEffect(() => {
    loadUser();
    return () => {
      unmounted = true;
    };
  }, []);

  async function loadUser() {
    if (unmounted) return;
    const user = await Auth.currentUserInfo();
    setUser(user);
  }

  return user;
}

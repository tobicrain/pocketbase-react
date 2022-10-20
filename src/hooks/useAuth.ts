import { Admin, User } from '@tobicrain/pocketbase';
import { useContext, useEffect, useState } from 'react';
import { AuthActions, AuthContext } from '../context/auth';
import { StorageService } from '../service/Storage';
import { useClientContext } from './useClientContext';

export interface AuthContextInterface {
  actions: AuthActions;
  isSignedIn: boolean | null;
  user: User | Admin | null;
}

export function useAuth(): AuthContextInterface {
  const client = useClientContext();
  const actions = useContext(AuthContext);
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | Admin | null>(null);

  function updateAuth() {
    setIsSignedIn(client?.authStore.token !== '');
    setUser(client?.authStore.model ?? null);
  }

  useEffect(() => {
    updateAuth();
    client?.authStore.onChange(() => {
      updateAuth();
    });
  }, []);

  return {
    actions: actions,
    isSignedIn: isSignedIn,
    user: user,
  };
}

import { useContext } from 'react';
import { AuthActions, AuthContext } from '../context/auth';

export function useAuth(): { actions: AuthActions | null } {
  const actions = useContext(AuthContext);
  return { actions };
}

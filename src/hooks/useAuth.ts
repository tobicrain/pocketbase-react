import { useContext } from 'react';
import { AuthContext, AuthContextInterface } from '../context/auth';

export function useAuth(): AuthContextInterface {
  return useContext(AuthContext);
}

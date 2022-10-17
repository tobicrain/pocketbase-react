import { useContext } from 'react';
import { ClientContext } from '../context';

const useClientContext = () => {
  const context = useContext(ClientContext);

  return context;
};

export { useClientContext };

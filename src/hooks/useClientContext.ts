import { useContext } from 'react';
import { ClientContext } from '../context/client';

export default () => {
  const context = useContext(ClientContext);

  return context;
};

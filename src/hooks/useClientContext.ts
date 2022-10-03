import { useContext } from 'react';
import { ClientContext } from '../context';

export default () => {
  const context = useContext(ClientContext);

  return context;
};

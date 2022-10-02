import { useContext } from 'react';
import { ClientContext } from '../context/Client';

export default () => {
  const context = useContext(ClientContext);

  return context;
};

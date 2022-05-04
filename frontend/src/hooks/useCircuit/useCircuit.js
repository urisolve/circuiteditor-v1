import { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts';

export function useCircuit() {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();

  const circuit = useMemo(() => {
    const circuitId = pathname.split('/').at(-1);
    return user?.circuits.find((circuit) => circuit._id === circuitId);
  }, [user, pathname]);

  return circuit;
}

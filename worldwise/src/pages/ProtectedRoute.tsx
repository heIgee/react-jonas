import { ReactNode, useEffect } from 'react';
import { useFakeUser } from '../context/FakeUserContext';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const {
    fakeUserState: { isAuthenticated },
  } = useFakeUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [navigate, isAuthenticated]);

  return children;
}

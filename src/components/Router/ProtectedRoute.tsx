import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from 'stores/auth';

import { AuthState, Routes } from 'utils/const';

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
  const { state: authState } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState !== AuthState.LoggedIn) {
      navigate(Routes.Login);
    }
  }, [authState, navigate]);

  return children;
};

export default memo(ProtectedRoute);

import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'stores/auth';

import { useAuth } from 'hooks/useAuth';
import { useAuthSilent } from 'hooks/useAuthSilent';
import { AuthState, Routes } from 'utils/const';

function Login() {
  useAuthSilent();
  const { login } = useAuth();
  const { state: authState } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === AuthState.LoggedIn) {
      navigate(Routes.Dashboard);
    }
  }, [authState, navigate]);

  return (
    <div className="bg-slate-900 w-[100dvw] h-[100dvh] flex justify-center items-center">
      <button
        onClick={login}
        className="bg-blue-400 text-white px-4 py-2 rounded-md"
        type="button"
      >
        Auth
      </button>
    </div>
  );
}

export default memo(Login);

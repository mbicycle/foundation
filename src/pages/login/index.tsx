import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'stores/auth';

import { useAuth } from 'hooks/useAuth';
import { AuthState } from 'utils/const';

function Login() {
  const { state: authState } = useAuthStore();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === AuthState.LoggedIn) {
      navigate('dashboard');
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

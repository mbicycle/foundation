import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'stores/auth';

import { AuthState, Routes } from 'utils/const';

// MSAL requires a page without any request to MSAL api
// for ssoSilent redirect

function Redirect() {
  const { state: authState } = useAuthStore();
  const navigate = useNavigate();

  const linkHandle = () => {
    navigate(authState === AuthState.LoggedIn ? Routes.Dashboard : Routes.Dashboard);
  };

  return (
    <div className="bg-slate-900 w-[100dvw] h-[100dvh] flex justify-center items-center">
      <button
        onClick={linkHandle}
        className="bg-blue-400 text-white px-4 py-2 rounded-md"
        type="button"
      >
        {authState === AuthState.LoggedIn ? 'Dashboard ->' : 'Login ->'}
      </button>
    </div>
  );
}

export default memo(Redirect);

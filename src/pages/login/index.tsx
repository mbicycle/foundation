import { memo } from 'react';

import { useAuth } from 'hooks/useAuth';

function Login() {
  const { login } = useAuth();

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

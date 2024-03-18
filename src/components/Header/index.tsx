import { memo } from 'react';

import useAuthStore from 'stores/auth';
import useUserStore from 'stores/user';
import { useAuth } from 'hooks/useAuth';

import { AuthState } from 'utils/const';

function Header() {
  const { state } = useAuthStore();
  const { user } = useUserStore();
  const { logout } = useAuth();

  return (
    <header className="bg-slate-800 w-full px-10 py-4 flex items-center justify-between">
      <div>
        <p>
          {'State: '}
          {
            state === AuthState.LoggedIn
              ? `Logged in as ${user?.name}, Role: ${user?.role}`
              : state
          }
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-blue-400 text-white px-4 py-2 rounded-md"
        type="button"
      >
        Logout
      </button>
    </header>
  );
}

export default memo(Header);

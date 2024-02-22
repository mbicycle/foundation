import { memo } from 'react';
import useUserStore from 'stores/user';

import { useAuth } from 'hooks/useAuth';
import { useAuthSilent } from 'hooks/useAuthSilent';

function Dashboard() {
  useAuthSilent();
  const { user } = useUserStore();
  const { logout, guestToken } = useAuth();

  const searchParams = new URLSearchParams();
  if (guestToken) searchParams.set('token', guestToken);

  const cvgenUrl = `${import.meta.env.VITE_CV_GEN_URL}?${searchParams.toString()}`;
  const timeUrl = `${import.meta.env.VITE_TIME_TRACKER_URL}?${searchParams.toString()}`;

  return (
    <div className="bg-slate-900 w-[100dvw] h-[100dvh] text-slate-300">
      <header className="bg-slate-800 w-full px-10 py-4 flex items-center justify-between">
        <div>
          <p>{`Logged in as ${user?.name}, Role: ${user?.role}`}</p>
        </div>
        <button
          onClick={logout}
          className="bg-blue-400 text-white px-4 py-2 rounded-md"
          type="button"
        >
          Logout
        </button>
      </header>
      <p className="text-3xl text-center py-6"> MBicycle Foundation</p>
      <ul className="flex mb-10 gap-10 p-10">
        <a
          href={cvgenUrl}
          className="border aspect-square border-slate-500 w-[15rem] flex justify-center items-center rounded-md
           hover:bg-slate-700"
        >
          CV Gen
        </a>
        <a
          href={timeUrl}
          className="border aspect-square border-slate-500 w-[15rem] flex justify-center items-center rounded-md
           hover:bg-slate-700"
        >
          CV Time Tracker
        </a>
      </ul>
    </div>
  );
}

export default memo(Dashboard);
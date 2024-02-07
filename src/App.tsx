import { AuthState } from 'utils/const.ts';

import { useAuth } from './hooks/useAuth';

function App() {
  const {
    logout,
    login,
    guestToken,
    role,
    userName,
    authState,
  } = useAuth();

  if (authState === AuthState.Loading) {
    return <div>Loading...</div>;
  }

  if (authState === AuthState.LoggedOut) {
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

  const searhParams = new URLSearchParams();
  if (guestToken) searhParams.set('token', guestToken);
  if (role) searhParams.set('role', role);

  const cvgenUrl = `${import.meta.env.VITE_CV_GEN_URL}?${searhParams.toString()}`;
  const timeUrl = `${import.meta.env.VITE_TIME_TRACKER_URL}?${searhParams.toString()}`;

  return (
    <div className="bg-slate-900 w-[100dvw] h-[100dvh] text-slate-300">
      <header className="bg-slate-800 w-full px-10 py-4 flex items-center justify-between">
        <div>
          <p>
            Logged in as
            {userName}
            , Role:
            {role}
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

export default App;

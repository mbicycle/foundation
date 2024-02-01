import {useAuth} from "./hooks/useAuth.ts";


function App() {
  const {logout, login, token, role, userName} = useAuth()

  if (!token)
    return (
      <div className="bg-slate-900 w-[100dvw] h-[100dvh] flex justify-center items-center">
        <button
            onClick={login}
            className="bg-blue-400 text-white px-4 py-2 rounded-md">
          Auth
        </button>
      </div>
    );

  return (
    <div className="bg-slate-900 w-[100dvw] h-[100dvh] text-slate-300">
      <header className="bg-slate-800 w-full px-10 py-4 flex items-center justify-between">
        <div>
          <p>Logged in as {userName}, Role: {role}</p>
        </div>
        <button
            onClick={logout}
            className="bg-blue-400 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </header>
      <p className="text-3xl text-center py-6"> MBicycle Foundation</p>
      <ul className="flex mb-10 gap-10 p-10">
        <a
            href={`${import.meta.env.VITE_CV_GEN_URL}?token=${token}`}
          className="border aspect-square border-slate-500 w-[15rem] flex justify-center items-center rounded-md"
        >
          CV Gen
        </a>
        <a
          href={`${import.meta.env.VITE_TIME_TRACKER_URL}?token=${token}`}
          className="border aspect-square border-slate-500 w-[15rem] flex justify-center items-center rounded-md"
        >
          CV Time Tracker
        </a>
      </ul>
    </div>
  );
}

export default App;

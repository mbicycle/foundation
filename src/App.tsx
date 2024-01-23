import { useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [{ token }, setCookie, removeCookie] = useCookies(["token"]);
  const searchParams = new URLSearchParams(window.location.search);
  const TOKEN = "1bc";

  const auth = () => {
    setCookie("token", TOKEN, {
      path: "/",
      secure: true,
      sameSite: "none",
    });
  };

  const logout = () => removeCookie("token");

  useEffect(() => {
    if (searchParams.get("unauth")) {
      removeCookie("token");
      window.history.replaceState({}, "", "/");
    }
  }, [removeCookie, searchParams]);

  if (!token)
    return (
      <div>
        <button onClick={auth}>Auth</button>
      </div>
    );

  return (
    <div className="bg-slate-900 w-[100dvw] h-[100dvh] text-slate-300">
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
      <button
        onClick={logout}
        className="bg-blue-400 text-white px-4 py-2 rounded-md absolute top-10 right-10"
      >
        Logout
      </button>
    </div>
  );
}

export default App;

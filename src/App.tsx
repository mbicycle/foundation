import { useCookies } from "react-cookie";

function App() {
  const [{ token }, setCookie, removeCookie] = useCookies(["token"]);

  const TOKEN = "1bc";

  const auth = () => {
    setCookie("token", TOKEN, {
      path: "/",
      secure: true,
      sameSite: "none",
    });
  };

  const logout = () => removeCookie("token");

  if (!token)
    return (
      <div>
        <button onClick={auth}>Auth</button>
      </div>
    );

  return (
    <div>
      <ul>
        <a href={`${import.meta.env.VITE_CV_GEN_URL}?token=${token}`}>CV Gen</a>
        <a href={`${import.meta.env.VITE_TIME_TRACKER_URL}?token=${token}`}>
          CV Time Tracker
        </a>
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;

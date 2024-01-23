import { useCookies } from "react-cookie";

function App() {
  const [{ token }, setCookie, removeCookie] = useCookies(["token"]);

  console.log(token);
  const auth = () => setCookie("token", "abc");

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
        <a href="http://localhost:3001">CV Gen</a>
        <a href="http://localhost:3002">CV Time Tracker</a>
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;

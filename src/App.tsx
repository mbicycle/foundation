import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import Router from './components/Router';
import MainProvider from './providers/main';
import useAuthStore from './stores/auth';
import useUserStore from './stores/user';
import { AuthState, COOKIE_NAME, cookieOptions } from './utils/const';

function App() {
  const { state: authState } = useAuthStore();
  const { user } = useUserStore();

  const [, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (authState === AuthState.LoggedIn && user?.name) {
      setCookie(COOKIE_NAME, user.name, cookieOptions);
    }
  }, [authState, setCookie, user]);

  return (
    <MainProvider>
      <Router />
    </MainProvider>
  );
}

export default App;

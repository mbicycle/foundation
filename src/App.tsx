import Router from './components/Router';
import MainProvider from './providers/main';

function App() {
  return (
    <MainProvider>
      <Router />
    </MainProvider>
  );
}

export default App;

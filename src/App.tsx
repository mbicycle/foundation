import {
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import MainProvider from './providers/main';

function App() {
  return (
    <MainProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </MainProvider>
  );
}

export default App;

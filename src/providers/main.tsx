import { BrowserRouter } from 'react-router-dom';

function MainProvider({ children }: {children: JSX.Element}) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}

export default MainProvider;

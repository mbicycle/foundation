import { BrowserRouter } from 'react-router-dom';

function MainProvider({ children }: {children: Node}) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}

export default MainProvider;

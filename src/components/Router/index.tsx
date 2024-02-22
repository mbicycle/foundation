import {
  Route,
  Routes as RoutesComponent,
} from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Redirect from 'pages/redirect';

import { Routes } from 'utils/const';

function Router() {
  return (
    <RoutesComponent>
      <Route path={Routes.Redirect} element={<Redirect />} />
      <Route path={Routes.Login} element={<Login />} />
      <Route path={Routes.Dashboard} element={<Dashboard />} />
    </RoutesComponent>
  );
}

export default Router;

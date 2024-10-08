import pageRoutes from '@/pages/pageRoutes'
import autoImport from './autoImport';
import { Home, Login } from '@/pages';
import { RouteObject } from 'react-router/dist/lib/context';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PathConfig = {
  // login: '/login',
  // home: '/home',
  ...pageRoutes,
};

function Redirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export const loginRoute: RouteObject[] = [
  {
    element: <Redirect to={PathConfig.login} />,
    path: '*'
  },
  {
    element: <Login />,
    path: PathConfig.login,
  },
];

export const pageRoute = (): RouteObject[] => [
  {
    path: PathConfig.home,
    element: <Home />,
  },
  {
    path: PathConfig.login,
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
  ...autoImport(),
];

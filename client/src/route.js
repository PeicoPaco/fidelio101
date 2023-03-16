import * as React from 'react';
const LoginPage = React.lazy(() => import('./Demo/Authentification/Login'));
const RecoverPassword = React.lazy(() => import('./Demo/Authentification/Resetpassword'));
const route = [
  // Asi estaba -> { path: '/login', exact: true, name: 'Login', component: LoginPage },
  { path: '/', exact: true, name: 'Login', component: LoginPage },
  { path: '/resetpassword', exact: true, name: 'RecoverPassword', component: RecoverPassword },
];
export default route;

import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';


function Loading() {
  return <div>Loading...</div>;
}


const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Customers = Loadable({
  loader: () => import('./views/Customers'),
  loading: Loading,
});


const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/general', name: 'General', component: Dashboard },
  { path: '/customers', name: 'Customers', component: Customers },
  { path: '/base', exact: true, name: 'Base', component: Customers },
  { path: '/base/cards', name: 'Cards', component: Customers },
 
];

export default routes;



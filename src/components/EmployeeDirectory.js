import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EmployeeListPage from '../pages/EmployeeListPage';
import EmployeeCreatePage from '../pages/EmployeeCreatePage';
import EmployeeDetailsPage from '../pages/EmployeeDetailsPage';
import NavBar from './NavBar';

const EmployeeDirectory = () => (
  <div>
    <NavBar />
    <Switch>
      <Route path="/create" component={EmployeeCreatePage} />
      <Route path="/employee/:id" component={EmployeeDetailsPage} />
      <Route path="/" component={EmployeeListPage} />
    </Switch>
  </div>
);

export default EmployeeDirectory;

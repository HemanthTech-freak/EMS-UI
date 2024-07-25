import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeCreatePage from './pages/EmployeeCreatePage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import EmployeeUpdatePage from './pages/EmployeeUpdatePage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/create" component={EmployeeCreatePage} />
          <Route path="/employee/update/:id" component={EmployeeUpdatePage} />
          <Route path="/employee/:id" component={EmployeeDetailsPage} />
          <Route path="/" component={EmployeeListPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

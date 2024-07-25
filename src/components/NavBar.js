import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

//Navbar component with the home and create new employee nav elements
const NavBar = () => (
  <nav className="navbar">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/create">Create Employee</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;

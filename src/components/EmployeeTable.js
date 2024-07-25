import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeTable.css';

//Display the employee details in a table
const EmployeeTable = ({ employees, handleDelete }) => (
  <table className="employee-table">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Title</th>
        <th>Department</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map(employee => (
        <tr key={employee.id}>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.title}</td>
          <td>{employee.department}</td>
          <td>{employee.employeeType}</td>
          <td className="action-buttons">
            <Link to={`/employee/${employee.id}`}>View</Link>
            <Link to={`/employee/update/${employee.id}`}>Update</Link>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EmployeeTable;

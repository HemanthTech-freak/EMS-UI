import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_EMPLOYEES } from './EmployeeListPage'; // Import the GET_EMPLOYEES query
import './EmployeeCreatePage.css';

//Graphql query for the mutation- create employee
const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $firstName: String!,
    $lastName: String!,
    $age: Int!,
    $dateOfJoining: String!,
    $title: String!,
    $department: String!,
    $employeeType: String!
  ) {
    createEmployee(
      firstName: $firstName,
      lastName: $lastName,
      age: $age,
      dateOfJoining: $dateOfJoining,
      title: $title,
      department: $department,
      employeeType: $employeeType
    ) {
      id
      firstName
      lastName
      title
      department
      employeeType
    }
  }
`;

//Using states to set the form 
const EmployeeCreatePage = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    age: 20,
    dateOfJoining: '',
    title: 'Employee',
    department: 'IT',
    employeeType: 'FullTime'
  });

  //Mutation for the creating an employee using graphql
  const [createEmployee, { loading, error }] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
    onCompleted: (data) => {
      console.log('Mutation completed with data:', data);
      setFormState({
        firstName: '',
        lastName: '',
        age: 20,
        dateOfJoining: '',
        title: 'Employee',
        department: 'IT',
        employeeType: 'FullTime'
      });
      alert('Employee created successfully');
    }
  });

  //Event once submit button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await createEmployee({ variables: { ...formState } });
    }
  };

  //Validations for the form
  const validateForm = () => {
    const { firstName, lastName, age, dateOfJoining } = formState;
    if (!firstName || !lastName || !age || !dateOfJoining) {
      alert('Please fill in all required fields.');
      return false;
    }
    if (age < 20 || age > 70) {
      alert('Age must be between 20 and 70.');
      return false;
    }
    return true;
  };

  //Form to input employee details with the validations
  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Create Employee</h2>
      <input
        type="text"
        placeholder="First Name"
        value={formState.firstName}
        onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formState.lastName}
        onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={formState.age}
        onChange={(e) => setFormState({ ...formState, age: parseInt(e.target.value) })}
        required
        min="20"
        max="70"
      />
      <input
        type="date"
        placeholder="Date of Joining"
        value={formState.dateOfJoining}
        onChange={(e) => setFormState({ ...formState, dateOfJoining: e.target.value })}
        required
      />
      <select
        value={formState.title}
        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
        required
      >
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="Director">Director</option>
        <option value="VP">VP</option>
      </select>
      <select
        value={formState.department}
        onChange={(e) => setFormState({ ...formState, department: e.target.value })}
        required
      >
        <option value="IT">IT</option>
        <option value="Marketing">Marketing</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
      </select>
      <select
        value={formState.employeeType}
        onChange={(e) => setFormState({ ...formState, employeeType: e.target.value })}
        required
      >
        <option value="FullTime">FullTime</option>
        <option value="PartTime">PartTime</option>
        <option value="Contract">Contract</option>
        <option value="Seasonal">Seasonal</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Employee'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default EmployeeCreatePage;

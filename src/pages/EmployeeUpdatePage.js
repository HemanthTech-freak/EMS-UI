import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import './EmployeeUpdatePage.css';

const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!,
    $title: String!,
    $department: String!,
    $currentStatus: Int!
  ) {
    updateEmployee(
      id: $id,
      title: $title,
      department: $department,
      currentStatus: $currentStatus
    ) {
      id
      firstName
      lastName
      title
      department
      employeeType
      currentStatus
    }
  }
`;

const EmployeeUpdatePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id }
  });

  const [formState, setFormState] = useState({
    title: '',
    department: '',
    currentStatus: 1
  });

  const [invalidFields, setInvalidFields] = useState({});

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      alert('Employee updated successfully');
      history.push('/');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await updateEmployee({ variables: { id, ...formState } });
    }
  };

  const validateForm = () => {
    const { title, department, currentStatus } = formState;
    const newInvalidFields = {};

    if (!title) {
      newInvalidFields.title = true;
    }
    if (!department) {
      newInvalidFields.department = true;
    }
    if (currentStatus === undefined) {
      newInvalidFields.currentStatus = true;
    }

    setInvalidFields(newInvalidFields);

    return Object.keys(newInvalidFields).length === 0;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { title, department, currentStatus } = data.employee;

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>Update Employee</h2>
      <label>Title</label>
      <select
        value={formState.title || title}
        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
        required
        className={invalidFields.title ? 'invalid' : ''}
      >
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="Director">Director</option>
        <option value="VP">VP</option>
      </select>
      <label>Department</label>
      <select
        value={formState.department || department}
        onChange={(e) => setFormState({ ...formState, department: e.target.value })}
        required
        className={invalidFields.department ? 'invalid' : ''}
      >
        <option value="IT">IT</option>
        <option value="Marketing">Marketing</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
      </select>
      <label>Current Status</label>
      <select
        value={formState.currentStatus || currentStatus}
        onChange={(e) => setFormState({ ...formState, currentStatus: parseInt(e.target.value) })}
        required
        className={invalidFields.currentStatus ? 'invalid' : ''}
      >
        <option value={1}>Working</option>
        <option value={0}>Not Working</option>
      </select>
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EmployeeUpdatePage;

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import './EmployeeDetailsPage.css';

//Query to fetch the employee details
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
      currentStatus
    }
  }
`;

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus } = data.employee;

  //Return the employee details in a card view
  return (
    <div className="employee-card">
      <h2>{firstName} {lastName}</h2>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Date of Joining:</strong> {new Date(dateOfJoining).toLocaleDateString()}</p>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Employee Type:</strong> {employeeType}</p>
      <p><strong>Current Status:</strong> {currentStatus === 1 ? 'Working' : 'Not Working'}</p>
    </div>
  );
};

export default EmployeeDetailsPage;

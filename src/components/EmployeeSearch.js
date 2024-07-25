import React, { useState } from 'react';

const EmployeeSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  //Handle the search functionality based on the input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search employees..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default EmployeeSearch;

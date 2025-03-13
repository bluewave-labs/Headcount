import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchEmployee = async () => { 
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/employees/1");
      const emp = response.data;
      setEmployee(emp);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employee, loading }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;

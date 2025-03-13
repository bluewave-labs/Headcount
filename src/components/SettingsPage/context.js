import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  companyApi,
  departmentsApi,
  jobTitlesApi,
  timeOffPoliciesApi,
  employeesApi,
  usersApi,
  getEmployeesByDepartment,
  getEmployeesByJobTitle,
} from "./api";

const SettingsContext = createContext(undefined);

export const SettingsProvider = ({ children }) => {
  const [company, setCompany] = useState({});
  const [departments, setDepartments] = useState([]);
  const [departmentsPeople, setDepartmentsPeople] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [jobTitlesPeople, setJobTitlesPeople] = useState([]);
  const [timeOffPolicies, setTimeOffPolicies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [updatedPermissions, setUpdatedPermissions] = useState([]);
  const [addEmployeesToManager, setAddEmployeesToManager] = useState([]);
  const [managerToEmployee, setManagerToEmployee] = useState([]);

  const [isLoading, setIsLoading] = useState({
    company: false,
    departments: false,
    departmentsPeople: false,
    jobTitles: false,
    jobTitlesPeople: false,
    employees: false,
    timeoffPolicies: false,
    users: false,
    permissions: false,
  });

  const fetchCompany = async () => {
    setIsLoading((isLoading) => ({ ...isLoading, company: true }));
    const companyData = await companyApi.fetch();
    setCompany(companyData);
    setIsLoading((isLoading) => ({ ...isLoading, company: false }));
  };

  const fetchUsers = async () => {
    setIsLoading((isLoading) => ({ ...isLoading, users: true }));
    const usersData = await usersApi.fetch();
    setUsers(usersData);
    setIsLoading((isLoading) => ({ ...isLoading, users: false }));
  };

  const fetchEmployees = async () => {
    setIsLoading((isLoading) => ({ ...isLoading, employees: true }));
    const employees = await employeesApi.fetch();
    setEmployees(employees);
    setIsLoading((isLoading) => ({ ...isLoading, employees: false }));
  };

  const fetchTimeOffPolicies = async () => {
    setIsLoading((isLoading) => ({ ...isLoading, timeoffPolicies: true }));
    const timeOffPolicies = await timeOffPoliciesApi.fetch();
    setTimeOffPolicies(timeOffPolicies);
    setIsLoading((isLoading) => ({ ...isLoading, timeoffPolicies: false }));
  };

  const fetchDepartments = async () => {
    setIsLoading((isLoading) => ({ ...isLoading, departments: true }));
    const departmentsData = await departmentsApi.fetch();
    setDepartments(departmentsData);
    setIsLoading((isLoading) => ({ ...isLoading, departments: false }));
  };

  const fetchDepartmentsPeople = async () => {
    setIsLoading((isLoading) => ({ ...isLoading, departmentsPeople: true }));
    const departmentsPeopleData = await getEmployeesByDepartment();
    setDepartmentsPeople(
      departmentsPeopleData.sort((a, b) =>
        a.departmentName.localeCompare(b.departmentName)
      )
    );
    setIsLoading((isLoading) => ({ ...isLoading, departmentsPeople: false }));
  };

  const fetchJobTitles = async () => {
    setIsLoading((isLoading) => ({ ...isLoading, jobTitles: true }));
    const jobTitlesData = await jobTitlesApi.fetch();
    setJobTitles(jobTitlesData);
    setIsLoading((isLoading) => ({ ...isLoading, jobTitles: false }));
  };

  const fetchJobTitlesPeople = async () => {
    setIsLoading((isLoading) => ({ ...isLoading, jobTitlesPeople: true }));
    const jobTitlesPeopleData = await getEmployeesByJobTitle();
    setJobTitlesPeople(
      jobTitlesPeopleData.sort((a, b) => a.roleTitle.localeCompare(b.roleTitle))
    );
    setIsLoading((isLoading) => ({ ...isLoading, jobTitlesPeople: false }));
  };

  useEffect(() => {
    fetchCompany();
    fetchDepartments();
    fetchDepartmentsPeople();
    fetchJobTitles();
    fetchJobTitlesPeople();
    fetchTimeOffPolicies();
    fetchEmployees();
    fetchUsers();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      company,
      departments,
      departmentsPeople,
      jobTitles,
      jobTitlesPeople,
      timeOffPolicies,
      employees,
      users,
      updatedPermissions,
      addEmployeesToManager,
      managerToEmployee,
      setUpdatedPermissions,
      setAddEmployeesToManager,
      setManagerToEmployee,
      fetchCompany,
      fetchDepartments,
      fetchDepartmentsPeople,
      fetchJobTitles,
      fetchJobTitlesPeople,
      fetchEmployees,
      fetchTimeOffPolicies,
      fetchUsers,
    }),
    [
      isLoading,
      company,
      departments,
      departmentsPeople,
      jobTitles,
      jobTitlesPeople,
      timeOffPolicies,
      employees,
      users,
      updatedPermissions,
      addEmployeesToManager,
      managerToEmployee,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);

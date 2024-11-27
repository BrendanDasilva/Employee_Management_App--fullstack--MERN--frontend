import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await apiClient.get("/emp/employees");
      setEmployees(response.data);
    } catch (error) {
      setError("Failed to load employees");
    }
  };

  // fetch employees on initial load
  useEffect(() => {
    fetchEmployees();
  }, []);

  // search functionality
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      // reset to all employees if search is cleared
      fetchEmployees();
      return;
    }

    try {
      const response = await apiClient.get(`/emp/employees/search`, {
        params: { department: query, position: query },
      });
      setEmployees(response.data.employees || []);
    } catch (error) {
      setError("Failed to search employees");
    }
  };

  // Delete an employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await apiClient.delete(`/emp/employees?eid=${id}`);
        setEmployees((prev) => prev.filter((emp) => emp.employee_id !== id));
      } catch (error) {
        setError("Failed to delete employee");
      }
    }
  };

  return (
    <div className="employee-list-container">
      <h1 className="employee-list-title">Employee List</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="search-and-add">
        <input
          type="text"
          placeholder="Search by Department or Position"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <button
          className="add-employee-button"
          onClick={() => navigate("/employees/add")}
        >
          Add Employee
        </button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <button
                  className="action-button view-details-button"
                  onClick={() => navigate(`/employees/${employee.employee_id}`)}
                >
                  View Details
                </button>
                <button
                  className="action-button update-button"
                  onClick={() =>
                    navigate(`/employees/update/${employee.employee_id}`)
                  }
                >
                  Update
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(employee.employee_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

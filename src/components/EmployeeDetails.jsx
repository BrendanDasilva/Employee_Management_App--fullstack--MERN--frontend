import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const EmployeeDetails = () => {
  const { id } = useParams(); // get the employee ID from the URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  // fetch employee details
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await apiClient.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        setError("Failed to fetch employee details");
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  const formatDate = (dateString) => {
    // Parse the date string into a local date
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <div className="employee-details-container">
      <h1 className="employee-details-title">Employee Details</h1>
      <div className="employee-details-card">
        <p>
          <strong>Name: </strong> {employee.first_name} {employee.last_name}
        </p>
        <p>
          <strong>Email: </strong> {employee.email}
        </p>
        <p>
          <strong>Position: </strong> {employee.position}
        </p>
        <p>
          <strong>Salary: </strong> {employee.salary}
        </p>
        <p>
          <strong>Date of Joining:</strong>{" "}
          {formatDate(employee.date_of_joining)}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <button
          className="back-button"
          onClick={() => navigate("/employees")} // navigate back to the employee list
        >
          Back to Employee List
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;

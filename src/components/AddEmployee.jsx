import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiClient.post("/emp/employees", employeeData);
      navigate("/employees"); // Redirect back to employee list
    } catch (error) {
      setError("Failed to add employee");
    }
  };

  return (
    <div className="add-employee-container">
      <h1 className="add-employee-title">Add Employee</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="add-employee-form" onSubmit={handleSubmit}>
        {[
          { label: "First Name", name: "first_name", type: "text" },
          { label: "Last Name", name: "last_name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Position", name: "position", type: "text" },
          { label: "Salary", name: "salary", type: "number" },
          { label: "Date of Joining", name: "date_of_joining", type: "date" },
          { label: "Department", name: "department", type: "text" },
        ].map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              value={employeeData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../axiosConfig";

const UpdateEmployee = () => {
  const { id } = useParams(); // get the employee ID from URL
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiClient.get(`/emp/employees/${id}`);

        // Format the date to "yyyy-MM-dd" for the date picker
        const formattedDate = response.data.date_of_joining
          ? response.data.date_of_joining.split("T")[0]
          : "";

        setEmployeeData({
          ...response.data,
          date_of_joining: formattedDate,
        });
      } catch (error) {
        setError("Failed to load employee data");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Ensure the date_of_joining is formatted correctly before sending
      const updatedEmployeeData = {
        ...employeeData,
        date_of_joining: new Date(employeeData.date_of_joining).toISOString(),
      };

      await apiClient.put(`/emp/employees/${id}`, updatedEmployeeData);
      navigate("/employees"); // redirect back to employees list
    } catch (error) {
      setError("Failed to update employee");
    }
  };

  if (!employeeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-employee-container">
      <h1 className="update-employee-title">Update Employee</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="update-employee-form" onSubmit={handleSubmit}>
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
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;

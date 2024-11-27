import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import EmployeeDetails from "./components/EmployeeDetails";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on initial load
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  // Function to handle login and logout updates
  const updateAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        updateAuthStatus={updateAuthStatus}
      />
      <Routes>
        {/* Login and Signup */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/employees" />
            ) : (
              <Login updateAuthStatus={updateAuthStatus} />
            )
          }
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/employees" /> : <Signup />}
        />

        {/* Protected Routes */}
        <Route
          path="/employees"
          element={isAuthenticated ? <EmployeeList /> : <Navigate to="/" />}
        />
        <Route
          path="/employees/add"
          element={isAuthenticated ? <AddEmployee /> : <Navigate to="/" />}
        />
        <Route
          path="/employees/update/:id"
          element={isAuthenticated ? <UpdateEmployee /> : <Navigate to="/" />}
        />
        <Route
          path="/employees/:id"
          element={isAuthenticated ? <EmployeeDetails /> : <Navigate to="/" />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

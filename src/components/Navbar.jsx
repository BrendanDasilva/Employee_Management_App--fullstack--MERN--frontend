import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, updateAuthStatus }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    updateAuthStatus(false); // update auth status
    navigate("/"); // redirect to login
  };

  return (
    <nav>
      <ul>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <span onClick={handleLogout} className="logout-link">
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

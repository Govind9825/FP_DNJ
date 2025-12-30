import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={isLoggedIn ? "/home" : "/"}>
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/home" ? "active" : ""
                    }`}
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/yourNotes" ? "active" : ""
                    }`}
                    to="/yourNotes"
                  >
                    Your Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/Contact" ? "active" : ""
                    }`}
                    to="/Contact"
                  >
                    Contact Us
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <form className="d-flex">
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/login" ? "active" : ""
                      }`}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/signup" ? "active" : ""
                      }`}
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </form>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

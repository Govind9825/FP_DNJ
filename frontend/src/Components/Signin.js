import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signin(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Access navigate function for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/createUser";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        props.showAlert("Sign Up Failed!", "danger");
        throw new Error("Failed to Sign Up");
      }

      const json = await response.json();
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userName", formData.name); // Save user's name in localStorage
      props.showAlert("Sign Up Successful", "success");
      navigate("/home"); // Redirect to home page after successful signup
    } catch (error) {
      props.showAlert("Sign Up Failed!", "info");
      console.error("Error Signing Up", error.message);
    }
  };

  return (
    <div>
      <div className="container my-5">
        <div className="card mx-auto border-0 shadow-lg" style={{ maxWidth: "30rem" }}>
          <div className="card-body">
            <h5 className="card-title text-center">Sign Up</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100">
                Sign Up
              </button>
            </form>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;

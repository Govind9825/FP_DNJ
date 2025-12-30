import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Access navigate function for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        props.showAlert("Login Failed!", "info");
        throw new Error("Failed to Login");
      }

      const json = await response.json();
      localStorage.setItem("token", json.authtoken);
      // Fetch user details after successful login
      await fetchUserDetails(json.authtoken);
      props.showAlert("Logged in Successfully!", "success");
      navigate("/home"); // Redirect to home page after successful login

    } catch (error) {
      props.showAlert("Wrong id / password", "danger");
      console.error("Error Logging", error.message);
    }
  };

  const fetchUserDetails = async (token) => {
    const userDetailsUrl = "http://localhost:5000/api/auth/userDetails";
    try {
      const response = await fetch(userDetailsUrl, {
        method : "POST",
        headers: {
          
          "Auth-token": token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const user = await response.json();
      localStorage.setItem("userName", user.name); // Save user's name in localStorage
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container my-5">
      <div className="card mx-auto border-0 shadow-lg" style={{ maxWidth: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form onSubmit={handleSubmit}>
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
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

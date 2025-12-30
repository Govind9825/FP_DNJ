import React from "react";
import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="container-fluid hero-section p-5 bg-light shadow-lg rounded">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-lg-6">
          <div className="text-center text-lg-start">
            <h1 className="display-4 mb-3">Welcome to Our App</h1>
            <p className="lead">
              Discover the power of our innovative app that helps you manage and
              organize your tasks effortlessly. Whether you're a professional or
              a student, our app simplifies your daily routine with intuitive
              features and seamless integration.
            </p>
            <div className="mt-4">
              <Link
                to="/login"
                className="btn btn-dark btn-lg me-2"
                aria-label="Login"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-dark btn-lg"
                aria-label="Sign Up"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className=" col-lg-2 container">
          <div className=" mt-4 mt-lg-4">
            <div
              className="rounded shadow-lg overflow-hidden"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transformOrigin: "center center",
                transform: "scale(1)",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0px 15px 25px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img
                src="hero.jpeg"
                className="img-fluid"
                alt="Hero section background"
                style={{ opacity: 0.9 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;

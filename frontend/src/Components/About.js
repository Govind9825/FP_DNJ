import React from "react";

const About = () => {
  return (
    <div>
      <div className="container my-5">
        <div
          className="card mx-auto border-0 shadow-lg"
          style={{ maxWidth: "30rem", animation: "slideInFromLeft 1s ease" }}
        >
          <div className="card-body">
            <h5 className="card-title text-center">About iNotebook</h5>
            <p className="card-text">
              iNotebook is a simple note-taking application built with React and
              Express. It allows you to create, edit, and delete notes securely.
            </p>
            <p className="card-text">
              This application demonstrates how to integrate front-end React
              with a back-end Node.js (Express) server for handling CRUD
              operations on notes.
            </p>
            <p className="card-text">
              Explore the features and enjoy organizing your thoughts with
              iNotebook!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

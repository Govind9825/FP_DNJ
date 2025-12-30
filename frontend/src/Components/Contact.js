import React from "react";

export default function Contact() {
  return (
    <div>
      <div className="container my-5">
        <div
          className="card mx-auto border-0 shadow-lg"
          style={{ maxWidth: "30rem", animation: "slideInFromRight 1s ease" }}
        >
          <div className="card-body">
            <h5 className="card-title text-center">Contact Us</h5>
            <p className="card-text">
              Feel free to reach out to us if you have any questions or feedback
              about iNotebook.
            </p>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

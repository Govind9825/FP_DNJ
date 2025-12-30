import React, { useContext, useState } from 'react';
import notecontext from '../Context/notes/NoteContext';

export default function Home() {
  const { addNote } = useContext(notecontext);

  const [note, setNote] = useState({ title: "", Description: "", Tag: "" });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim() === "" || note.Description.trim() === "") {
      setMessage("Title and Description are required.");
    } else {
      addNote(note.title, note.Description, note.Tag);
      setMessage("Note added successfully!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setNote({ title: "", Description: "", Tag: "" });
    }
  };

  // Fetch username from localStorage
  const userName = localStorage.getItem("userName");

  return (
    <div className="container my-5 p-4 border rounded shadow-lg bg-light">
      <h1 className="text-center mb-4">Welcome, {userName}!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Enter the title of your note"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="Description"
            name="Description"
            value={note.Description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter the Description of your note"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="Tag"
            name="Tag"
            value={note.Tag}
            onChange={handleChange}
            placeholder="Enter a Tag for your note"
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Add
        </button>
      </form>
      {message && (
        <div className="alert alert-success mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}

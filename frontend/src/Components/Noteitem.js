import React, { useContext, useState } from "react";
import notecontext from "../Context/notes/NoteContext";

export default function Noteitem({ note }) {
  const context = useContext(notecontext);
  const { updateNote, deleteNote } = context;
  const [editableNote, setEditableNote] = useState({ ...note });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setEditableNote({ ...editableNote, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    updateNote(editableNote._id, editableNote.title, editableNote.Description, editableNote.Tag);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    deleteNote(note._id);
  };

  return (
    <div
      className="card col mb-3"
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div className="card-body">
        {isEditing ? (
          <>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={editableNote.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="Description"
                name="Description"
                value={editableNote.Description}
                onChange={handleChange}
                rows="4"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Tag" className="form-label">Tag</label>
              <input
                type="text"
                className="form-control"
                id="Tag"
                name="Tag"
                value={editableNote.Tag}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title" style={{ color: "#333", fontWeight: "bold", marginBottom: "10px" }}>
              {note.title}
            </h5>
            <p className="card-text" style={{ color: "#555", marginBottom: "10px" }}>
              {note.Description}
            </p>
            <div
              className="card-footer text-muted"
              style={{
                background: "#f8f9fa",
                borderTop: "1px solid #ddd",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <small>{note.Tag}</small>
            </div>
          </>
        )}
        <div className="container my-4">
          <button type="button" onClick={handleDeleteClick} className="btn btn-dark mx-2">
            Delete
          </button>
          {isEditing ? (
            <button type="button" onClick={handleUpdateClick} className="btn btn-dark">
              Save
            </button>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)} className="btn btn-dark">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

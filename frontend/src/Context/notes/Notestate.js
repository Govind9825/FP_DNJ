import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const { showAlert } = props;
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem('token');

  // Function to fetch all notes from the server
  const fetchAllNotes = async () => {
    const url = `${host}/api/notes/fetchallNotes`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": `${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const json = await response.json();
      showAlert("Here are all your previously saved notes", "success");
      setNotes(json); 
    } catch (error) {
      console.error("Error fetching notes:", error.message);
      showAlert("Failed to fetch notes", "danger");
    }
  };

  // Function to add a new note
  const addNote = async (title, Description, Tag) => {
    const url = `${host}/api/notes/postNotes`;
    const note = {
      title,
      Description,
      Tag
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": `${token}`
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      showAlert("Note added successfully", "success");
      const json = await response.json();
      setNotes([...notes.concat(json)]); // Update state with new note
    } catch (error) {
      console.error("Error adding note:", error.message);
      showAlert("Failed to add note", "danger");
    }
  };

  // Function to delete a note by ID
  const deleteNote = async (id) => {
    try {
      const url = `${host}/api/notes/deleteNotes/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": `${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      showAlert("Note deleted successfully", "success");
      // const json = await response.json();
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error.message);
      showAlert("Failed to delete note", "danger");
    }
  };

  // Function to update a note by ID
  const updateNote = async (id, title, Description, Tag) => {
    const url = `${host}/api/notes/updateNotes/${id}`;
    const data = {
      title,
      Description,
      Tag,
    };
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Auth-token": token
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
  
      // const updatedNote = await response.json();
      showAlert("Note updated successfully", "success");
  
      setNotes(prevNotes => {
        const newNotes = prevNotes.map(note => 
          note._id === id ? { ...note, title, Description, Tag } : note
        );
        return newNotes;
      });
    } catch (error) {
      console.error("Error updating note:", error.message);
      showAlert("Failed to update note", "danger");
    }
  };
  

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, fetchAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

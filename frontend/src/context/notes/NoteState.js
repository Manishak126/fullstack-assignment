import noteContext from "./noteContext";
import { useState } from "react";
import React from "react";

const NoteState=(props)=>{
    const host ="http://localhost:5000"
    const notesInitial =[]
    const [notes, setNotes] = useState(notesInitial)

// Get all Notes
const getNotes = async () => {
  const token = localStorage.getItem("token");
  console.log("Token: ", token); // Log the token for debugging
  if (!token) {
    console.error("No token found");
    return;
  }
  try{
      // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
    });

    const json=await response.json()
    console.log("Fetched Notes: ", json);
    if (response.ok) {
      setNotes(Array.isArray(json) ? json : []);
    } else {
      console.error("Failed to fetch cards", json);
    }
     }catch(error){
      console.error("Error fetching cards", error)
     }
};


// Add a Note
const addNote=async (title, description)=>{
  try {
    const token = localStorage.getItem("token");
    // API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  } catch (error) {
    console.error("Error adding notes", error);
  }
}

// Delete a Note
const deleteNote=async (id)=>{
  try {
    const token = localStorage.getItem("token");
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json =await response.json();
    console.log(json);

    console.log("Deleting Card with id:" + id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  } catch (error) {
    console.error("Error adding Cards", error);
  }
}

// Edit a Note
const editNote=async (id, title, description)=>{
  try {
    const token = localStorage.getItem("token");
    // API Call
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description }),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes);
  } catch (error) {
    console.error("Error adding Cards", error);
  }
}

    return(
       < noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
       </noteContext.Provider>
    )
}

export default NoteState;

import React, { useContext,useState } from 'react'
import NoteContext from "../context/notes/noteContext";

const AddNote = (props) => {
     const context = useContext(NoteContext);
     const {addNote } = context;

     const [note, setNote]= useState({title:"", description:""})

     const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description);
        setNote({ title: "", description: ""});
        props.showAlert("Card Added Successfully", "success");
     }

     const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
     }

  return (
    <div className="container my-3">
      <h2>Add a Card</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            minLength={5}
            required
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={note.title.length < 5 || note.description.length < 5}
          onClick={handleClick}
        >
          Add Card
        </button>
      </form>
    </div>
  );
}

export default AddNote

import React, { useState, useRef, useContext } from "react";
import "./AddCard.css";
import NoteContext from "../../context/notes/noteContext";

const AddCard = ({ setShowAddRequest, showAlert,fetchNotes }) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "" });
  const refClose = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description);
    setNote({ title: "", description: "" });
    // refClose.current.click();
    setShowAddRequest(false);
    showAlert("Card Added Successfully", "success");
    fetchNotes();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-card-overlay add-card">
      <div className="add-card-modal">
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowAddRequest(false)}
        ></button>
        <h1>Add Card</h1>
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
            type="button"
            className="btn btn-primary"
            disabled={note.title.length < 5 || note.description.length < 5}
            onClick={handleClick}
          >
            Add Card
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowAddRequest(false)}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;

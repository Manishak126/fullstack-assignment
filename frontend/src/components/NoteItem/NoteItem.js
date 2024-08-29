import './NoteItem.css'
const NoteItem = ({ note }) => {
  // Check if note is defined and has required properties
  console.log("Note data:", note);
  if (!note || !note.title || !note.description) {
    return <div className="col-md-3"></div>;
  }

  return (
   
      <div className="col-md-3 disp-notes">
        <div className="card my-2 note-card">
          <div className="card-body ">
            <h5 className="card-title">{note.title}</h5>
            <hr></hr>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      
    </div>
  );
};

export default NoteItem;

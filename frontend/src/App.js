// App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NewNavbar from "./components/NewNavbar/NewNavbar";
import AddCard from "./components/AddCard/AddCard";
import NoteItem from "./components/NoteItem/NoteItem";

function App() {
  const [alert, setAlert] = useState(null);
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [notes, setNotes] = useState([]); // State to hold notes

  const [noResults, setNoResults] = useState(false); // State to track if no results are found

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // Fetch notes function
  const fetchNotes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/fetchallnotes"
      ); // Use full URL for testing
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setNotes(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Fetch notes by title
  const fetchNotesByTitle = async (title) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/searchnotes?title=${encodeURIComponent(
          title
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setNotes(data); // Update notes state with search results
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NoteState>
      <div className="app">
        <NewNavbar
          setShowAddRequest={setShowAddRequest}
          fetchNotesByTitle={fetchNotesByTitle} // Not used here but can be for other purposes
        />
        <Alert alert={alert} />
        <Header fetchNotesByTitle={fetchNotesByTitle} />{" "}
        {/* Pass fetchNotesByTitle to Header */}
        {showAddRequest && (
          <AddCard
            setShowAddRequest={setShowAddRequest}
            showAlert={showAlert}
            fetchNotes={fetchNotes} // Pass fetchNotes function as a prop
          />
        )}
        <div className="container">
          <Routes>
            <Route path="/home" element={<Home showAlert={showAlert} />} />
          </Routes>
        </div>
        <div className="container">
          <div className="row">
            {noResults ? ( // Conditional rendering based on noResults state
              <p>Title not found</p>
            ) : (
              notes.map((note) => <NoteItem key={note._id} note={note} />)
            )}
          </div>
        </div>
        <Footer />
      </div>
    </NoteState>
  );
}

export default App;

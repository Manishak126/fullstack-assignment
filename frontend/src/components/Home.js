import React from "react";
import Notes from "./Notes";
import NoteItem from "./NoteItem/NoteItem";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <NoteItem showAlert={showAlert} />
    </div>
  );
};

export default Home;

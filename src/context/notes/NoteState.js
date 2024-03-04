import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)
  // get all notes 
  const getnote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },  
   // body data type must match "Content-Type" header
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
    }

  // add notes
  const addnote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },  
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
  const json = await response.json();
  console.log(json);

    const note =json;
    setNotes(notes.concat(note))
  }
  // delete notes
  const deletenote = async(id) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },  
     // body data type must match "Content-Type" header
    });
   const json = response.json();
    console.log("deleting" + id);
    const newnotes = notes.filter((note) => { return note._id !== id });
    setNotes(newnotes);
  }

  // edit notes
  const editnote = async(id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },  
      body: JSON.stringify({title, description}), // body data type must match "Content-Type" header
    });
   const json = response.json();
    // Logic to add a client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addnote, deletenote, editnote ,getnote }}
    //  value={{state,update}}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;


// const s1 = {
  //   "name":"shivam",
  //   "age":"24"
  // }
  // const [state, setState] = useState(s1);
  // const update = ()=>{
  //   setTimeout(() => {
  //       setState({
  //           "name":"chourey",
  //           "age":"54"
  //       })    
  //   }, 1000);
  // }
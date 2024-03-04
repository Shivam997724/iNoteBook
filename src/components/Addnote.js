import React, { useState, useContext } from "react";
import NoteContext from '../context/notes/NoteContext';


const Addnote = (props) => {
  const context = useContext(NoteContext)
  const { addnote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "default" })
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault()
    addnote(note.title, note.description, note.tag)
    setNote({ title: "", description: "" })
    props.showAlert("Added Successfully ","success")
  }
  
  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={handleChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">description</label>
            <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={handleChange} minLength={5} required />
          </div>
          <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>AddNote</button>
        </form>
      </div>
    </div>
  )
}

export default Addnote
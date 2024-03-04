import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(NoteContext)
  const { notes, getnote, editnote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

  const ref = useRef(null)
  const refclose = useRef(null)

  const history = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      getnote()
    }
    else{
  history('/login')
    }
  }, [])


  const update = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description })
    
  }

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    console.log("update the note", note);
    editnote(note.id, note.etitle, note.edescription)
    refclose.current.click();
    props.showAlert("Update Successfully ","success")
  }
  return (
    <div>
      <Addnote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' onChange={handleChange} value={note.edescription} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1>your notes</h1>
        <div className="container">
        {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} update={update} showAlert={props.showAlert}  note={note} />
        })}
      </div>
    </div>
  )
}

export default Notes;
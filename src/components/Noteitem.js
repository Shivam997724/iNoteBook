import React ,{useContext}from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const {deletenote} = context;
    const { note,update } = props
    return (
        <div className='col-md-3' >
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex align-items-center '>
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deletenote(note._id);props.showAlert("Deleted Successfully ","success")}}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{update(note)}}></i>
                    </div>
                    <p className="card-text">{note.description} </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
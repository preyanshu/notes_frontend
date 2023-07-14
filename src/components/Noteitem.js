import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const  { deleteNote,post1 } = context;
    const { note, updateNote } = props;
    setInterval(() => {
        console.log("imp   " + post1);
        
    }, 1);
    return (
        <>
       
      <div className="col-md-3">
    <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("note deleted successfully","danger")}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
            <p className="card-text">{note.description}</p>

        </div>
      </div>
     </div>

  
     </>
    )
}

export default Noteitem
import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const {showAlert}=props;
    // const { editNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){ getNotes()}
        else{
            navigate("/login");

        }
       
        // eslint-disable-next-line
    }, [])




    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }
    const handleClick = (e)=>{
        console.log("handle click")
        console.log({id:note.id, title:note.etitle, desc:note.edescription, tag:note.etag})
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("note ubdated successfuly","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
   







    const host = "https://backend-jiu4.onrender.com"

  
    const notesInitial = []
    const [post1,setPost]=useState(false)
    // useEffect
  
  // console.log("yo"+post1.value)
    
    
    const [notes, setNotes] = useState(notesInitial)
  
    // Get all Notes
    const getNotes = async() => {
        setPost(true);
      
      
        // API Call 
  
        
          await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            }
          }).then((data)=>{
            return data.json()
      
      
          }).then((json)=>{
            
          console.log(json)
         setNotes(json)
          
          setPost(false)
           
           
      
          });
          
        
       
     
      
        
        
      
      
      
      
     
      
     
    }
    const editNote = async (id, title, description, tag) => {
         // Logic to edit in client
         let newNotes = JSON.parse(JSON.stringify(notes))
       
         for (let index = 0; index < newNotes.length; index++) {
           const element = newNotes[index];
           if (element._id === id) {
             newNotes[index].title = title;
             newNotes[index].description = description;
             newNotes[index].tag = tag; 
             break; 
           }
         }  
         console.log("new notes : ")
         console.log(newNotes)
         setNotes(newNotes);





        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
    
       
      }


    const deleteNote = async (id) => {
        console.log(notes)
        console.log("hi")

        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          }
        });
        const json = response.json();
        console.log(json)
    
        
      }

      const addNote = async (title, description, tag) => {
        setPost(true)

        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag})
        });
         
    
        console.log("Adding a new note")
        
       
        getNotes();
        setPost(false)
      }
    

    return (
        <>
            {/* <AddNote /> */}
            <div className="flex1">
            
       <AddNote showAlert={showAlert} addNote={addNote}></AddNote>
 <div style={{height: 300 + 'px',width : 300+"px"}}>
<lottie-player src="https://lottie.host/b6046211-5996-477a-9254-69e90a10bcf3/hvVoDXn9hw.json"  speed="1" style={{height: 300+'px',width : 300+"px"}} direction="1" mode="normal" loop autoplay></lottie-player>
</div>     </div>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{color:'black'}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div> */}
 
                            </form>
                        </div>
                        <div className="modal-footer">
                       < button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<1 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="row my-3">

            <h2>You Notes</h2>
          
          
          <div className="container text-center mt-30">{post1 && <img src="Rolling-1s-200px (1).gif " className='mt-3 mb-3' height="75px" width="75px"/>} </div>
          {notes.length==0 && !post1 && <h5 className='my-5 mx-3'>No notes to display..</h5>}

                   {!post1 && notes.map((note) => {
                    return (<Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} deleteNote={deleteNote}/>)
                })}
                
               
            </div>
            
        </>
    )
}

export default Notes
import React, { useEffect,useState } from 'react'
import "./Mynotes.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Mynotes = () => {
  const [notes,setNotes]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchNotes=async ()=>{
      try{
        const res=await axios.get("http://localhost:5050/api/notes");
        setNotes(res.data);
      }
      catch(error){
        console.log("Error :",error);
      }
    };

    fetchNotes();
  },[]);
  return (
    <div className='Omynotes'>
      <div className="inner1">
        <h1>My Notes</h1>
        <div className="inner2">
          {notes.length===0?(
            <p className='inner2_p'>No notes found in your HISTORY.</p>
          ):(notes.map((note)=>(
            <div className="box_note" key={note._id} onClick={()=> navigate(`/note/${note._id}`)}>
              <h2>{note.title}</h2>
              <h3>{note.note.split(" ").slice(0, 10).join(" ") + "..."}</h3>
            </div>
          ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Mynotes
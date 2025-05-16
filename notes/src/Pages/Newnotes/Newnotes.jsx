import React,{useState} from 'react'
import "./Newnotes.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Newnotes = () => {
  const [title,setTitle]=useState('');
  const [notes,setNotes]=useState('');
  const navigate=useNavigate();
  const handlesubmit=async()=>{
    if(!title || !notes){
      alert("Please fill both blanks...");
      return;
    }
    try{
      await axios.post("http://localhost:5050/api/notes",{
        title,
        note:notes
      });
      alert("Note saved");
      setTitle('');
      setNotes('');
      navigate('../mynotes');
    }
    catch(error){
      console.log("error: ",error);
      alert("Error occurred");
    }
  }

  return (
    <div className='Onewnotes'>
      <h1>NEW NOTES</h1>
      <div className="inner_notes">
        <input placeholder='Title' className='headtitle' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
        <textarea className='' id="noteInput" placeholder="Write your note here..." value={notes} onChange={(e)=> setNotes(e.target.value)}></textarea>
        <button onClick={handlesubmit}>Save Note</button>
      </div>
    </div>
  )
}

export default Newnotes
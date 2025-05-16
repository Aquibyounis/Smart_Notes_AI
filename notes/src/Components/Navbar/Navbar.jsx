import React from 'react'
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="list">
        <h1 className='title'>MySmartNotes</h1>
        <div className="list2">
          <Link className='mynotes btn' style={{textDecoration:'none',color:'white'}} to="/">Home</Link>
          <Link className='mynotes btn' style={{textDecoration:'none',color:'white'}} to="/mynotes">My Notes <i class=" icon fa-solid fa-note-sticky"></i></Link>
          <Link className='newnotes btn' style={{textDecoration:'none',color:'white'}} to="/newnotes">New Notes <i class=" icon fa-solid fa-plus"></i></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
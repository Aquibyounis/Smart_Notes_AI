import './App.css';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from "./Pages/Home/Home";
import Newnotes from './Pages/Newnotes/Newnotes';
import Mynotes from './Pages/Mynotes/Mynotes';
import NoteDetail from './Pages/NoteDetail/NoteDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/mynotes" element={<Mynotes/>}/>
          <Route path="/newnotes" element={<Newnotes/>}/>
          <Route path="/note/:id" element={<NoteDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

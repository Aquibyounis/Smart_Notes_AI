import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Notedetail.css';
import ReactMarkdown from 'react-markdown';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noteData, setNoteData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedNote, setUpdatedNote] = useState('');
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5050/api/notes/${id}`);
      alert("Note deleted");
      navigate("/mynotes");
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Error deleting note");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5050/api/notes/${id}`, {
        title: updatedTitle,
        note: updatedNote,
      });
      alert("Note updated");
      setNoteData(res.data);
      setEditable(false);
    } catch (err) {
      console.error("Error updating note:", err);
      alert("Failed to update note");
    }
  };

  const handleSummarize = async () => {
    setLoadingSummary(true); // Set loading state to true while summarizing
    try {
      const res = await axios.post('http://localhost:5050/api/summarize', {
        text: updatedNote, // Assuming `updatedNote` holds the note's content
      });
      setSummary(res.data.summary); // Store summarized content
    } catch (error) {
      console.error("Error summarizing:", error);
      alert("Error summarizing the text");
    } finally {
      setLoadingSummary(false); // Set loading state to false after completion
    }
  };
  
  

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/notes/${id}`);
        setNoteData(res.data);
        setUpdatedTitle(res.data.title);
        setUpdatedNote(res.data.note);
      } catch (err) {
        console.error('Error fetching note:', err);
      }
    };
    fetchNote();
  }, [id]);

  if (!noteData) return <p>Loading...</p>;

  return (
    <div className="note-detail">
      {editable ? (
        <>
          <input
            className="edit-title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            className="edit-text"
            value={updatedNote}
            onChange={(e) => setUpdatedNote(e.target.value)}
          />
          <button className='note-btn' onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h1 className="note-title-heading">{noteData.title}</h1>
          <div className="note-textarea">
            <ReactMarkdown>{noteData.note}</ReactMarkdown>
          </div>
          <button className="note-btn2" onClick={handleSummarize}>
            {loadingSummary ? 'Summarizing...' : 'Summarize'}
          </button>
          {summary && (
            <div className="note-textarea" style={{ marginTop: '20px' }}>
              <h2>Summary</h2>
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          )}
        </>
      )}

      <div className="editing">
        <div className="a" onClick={() => setEditable(!editable)}>
          <i className="fa-solid fa-user-pen"></i>
        </div>
        <div className="a" onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;

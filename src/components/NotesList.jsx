import React from 'react';
import Note from './Note';
import './NotesList.css';
function NotesList({ notes, updateNote, deleteNote }) {
 // Show message if no notes exist
 if (notes.length === 0) {
 return (
 <div className="notes-empty">
 <img src="https://static.vecteezy.com/system/resources/previews/018/931/199/original/light-bulb-lamp-icon-png.png" alt="lamp" width={100} />

 <p className="notes-empty-text">Notes you add appear here</p>
 </div>
 );
 }
 return (
 <div className="notes-container">
 <div className="notes-grid">
 {notes.map(note => (
 <Note
 key={note.id}
 note={note}
 updateNote={updateNote}
 deleteNote={deleteNote}
 />
 ))}
 </div>
 </div>
 );
}
export default NotesList;

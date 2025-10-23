// src/components/TrashList.js
import React from 'react';
import Note from './Note';
import './NotesList.css'; // Kita bisa pakai CSS yang sama

// 1. PASTIKAN Anda menerima 'deleteNote' di sini, BUKAN 'deletePermanently'
function TrashList({ notes, restoreNote, deleteNote }) {
  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <img src="https://img.icons8.com/?size=100&id=11650&format=png&color=FF9D00" alt="" />
        <p className="notes-empty-text">Your trash is empty.</p>
      </div>
    );
  }

  return (
    <div className="notes-container">
        <h2>Trash</h2>
        <div className="notes-grid">
        {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              isInTrash={true}
              restoreNote={restoreNote}
              // 2. PASTIKAN Anda meneruskan 'deleteNote' ke komponen Note
              deleteNote={deleteNote}
            />
        ))}
        </div>
    </div>
  );
}

export default TrashList;
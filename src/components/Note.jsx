import React, { useState } from 'react';
import './Note.css';

function Note({ note, updateNote, deleteNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    updateNote(note.id, { ...note, title: editTitle, content: editContent });
    setIsEditing(false);
  };

  
  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };


 const handleDelete = () => {
    // Jika di trash, konfirmasi hapus permanen
    const confirmMessage = isInTrash 
      ? 'Are you sure you want to permanently delete this note?'
      : 'Move this note to trash?';
      
    if (window.confirm(confirmMessage)) {
      deleteNote(note.id);
    }
  };

   const handleRestore = () => {
    restoreNote(note.id);
  };



   return (
    <div className="note">
      {isEditing ? (
        // ... (Mode Edit tidak perlu diubah)
        <div className="note-edit">
          {/* ... */}
        </div>
      ) : (
        // 4. Nonaktifkan klik untuk edit jika di trash
        <div className="note-view" onClick={!isInTrash ? () => setIsEditing(true) : undefined}>
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>
          <div className="note-actions">

            {/* 3. Tambahkan Tombol Restore di sini */}
            {/* Tombol ini hanya muncul jika `isInTrash` adalah true */}
            {isInTrash && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestore();
                }}
                className="note-action-button"
                title="Restore note"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l4 4l4-4H6a7 7 0 1 1 7 7a.5.5 0 0 0-1 0a8 8 0 1 0-8-8z"/>
                </svg>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="note-action-button" // <-- Ubah nama class agar sama
              title={isInTrash ? "Delete permanently" : "Move to trash"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Note;

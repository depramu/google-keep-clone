import React, { useState } from 'react';
import './Note.css';

// 1. Menerima semua props yang dibutuhkan dari kedua versi
function Note({ note, updateNote, deleteNote, restoreNote, isInTrash = false }) {
  // State dari versi pertama, sudah benar
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  // Fungsi handleSave dari versi pertama, sudah benar
  const handleSave = () => {
    updateNote(note.id, { ...note, title: editTitle, content: editContent });
    setIsEditing(false);
  };

  // Fungsi handleCancel dari versi kedua, untuk membatalkan edit
  const handleCancel = () => {
    // Kembalikan teks ke kondisi semula sebelum edit
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };
  
  // Fungsi handleDelete yang lebih canggih dari versi kedua
  const handleDelete = () => {
    const confirmMessage = isInTrash 
      ? 'Are you sure you want to permanently delete this note?'
      : 'Move this note to trash?';
      
    if (window.confirm(confirmMessage)) {
      deleteNote(note.id);
    }
  };
  
  // Fungsi baru untuk restore dari versi kedua
  const handleRestore = () => {
    if (restoreNote) { // Pastikan fungsi restoreNote ada
        restoreNote(note.id);
    }
  };

  return (
    <div className="note">
      {/* Gunakan Tampilan Edit yang lengkap dari versi pertama */}
      {isEditing ? (
        <div className="note-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="note-edit-input"
            autoFocus
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Take a note..."
            className="note-edit-textarea"
            rows={4}
          />
          <div className="note-edit-actions">
            <button onClick={handleSave} className="note-button note-button-save">Save</button>
            {/* Gunakan fungsi handleCancel yang baru */}
            <button onClick={handleCancel} className="note-button note-button-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        // Gunakan Tampilan View dengan logika trash dari versi kedua
        // 4. Nonaktifkan klik untuk edit jika di trash
        <div className="note-view" onClick={!isInTrash ? () => setIsEditing(true) : undefined}>
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>
          <div className="note-actions">
            
            {/* 3. Tambahkan Tombol Restore dari versi kedua */}
            {isInTrash && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestore();
                }}
                className="note-action-button"
                title="Restore note"
              >
                {/* SVG untuk Restore */}
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 2c-5.621 0-10.211 4.44-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-4.471 3.988-8 8.475-8s8.218 3.529 8.475 8h2.025c-.261-5.56-4.854-10-10.475-10z"/></svg>
              </button>
            )}

            {/* Tombol Delete yang dinamis dari versi kedua */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Mencegah mode edit aktif saat klik tombol
                handleDelete();
              }}
              className="note-action-button"
              title={isInTrash ? "Delete permanently" : "Move to trash"}
            >
              {/* SVG untuk Delete/Trash */}
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
import React, { useState } from "react";
import "./Note.css";

// 1. Menerima semua props yang dibutuhkan dari kedua versi
function Note({ note, updateNote, deleteNote, restoreNote, isInTrash = false }) {
  // State dari versi pertama, sudah benar
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editColor, setEditColor] = useState(note.color || "#ffffff");
  const [showPalette, setShowPalette] = useState(false);

    const colorPalette = [
    "#ffffff", "#f28b82", "#fbbc04", "#fff475",
    "#ccff90", "#a7ffeb", "#cbf0f8", "#aecbfa",
    "#d7aefb", "#fdcfe8", "#e6c9a8", "#e8eaed",
  ];


  // Fungsi handleSave dari versi pertama, sudah benar
  const handleSave = () => {
    updateNote(note.id, { ...note, title: editTitle, content: editContent, color: editColor });
    setIsEditing(false);
    setShowPalette(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditColor(note.color || "#ffffff");
    setIsEditing(false);
    setShowPalette(false);
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
<<<<<<< HEAD
    if (window.confirm("Delete this note?")) deleteNote(note.id);
=======
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
>>>>>>> db236c08759c2e840a2aef20384b93c9cb395343
  };

  const noteStyle = { backgroundColor: editColor };

  return (
<<<<<<< HEAD
    <div className="note" style={noteStyle}>
=======
    <div className="note">
      {/* Gunakan Tampilan Edit yang lengkap dari versi pertama */}
>>>>>>> db236c08759c2e840a2aef20384b93c9cb395343
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

          {/* 🎨 Tombol palet warna */}
          <div className="palette-section">
            <button
              type="button"
              className="palette-toggle"
              onClick={() => setShowPalette(!showPalette)}
              title="Change color"
            >
              🎨
            </button>

            {showPalette && (
              <div className="color-palette">
                {colorPalette.map((clr, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`color-dot ${editColor === clr ? "selected" : ""}`}
                    style={{ backgroundColor: clr }}
                    onClick={() => setEditColor(clr)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="note-edit-actions">
<<<<<<< HEAD
            <button onClick={handleSave} className="note-button note-button-save">
              Save
            </button>
            <button
              onClick={handleCancel}
              className="note-button note-button-cancel"
            >
              Cancel
            </button>
=======
            <button onClick={handleSave} className="note-button note-button-save">Save</button>
            {/* Gunakan fungsi handleCancel yang baru */}
            <button onClick={handleCancel} className="note-button note-button-cancel">Cancel</button>
>>>>>>> db236c08759c2e840a2aef20384b93c9cb395343
          </div>
        </div>
      ) : (
        // Gunakan Tampilan View dengan logika trash dari versi kedua
        // 4. Nonaktifkan klik untuk edit jika di trash
        <div className="note-view" onClick={!isInTrash ? () => setIsEditing(true) : undefined}>
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>

          <div className="note-actions">
<<<<<<< HEAD
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="note-delete"
              title="Delete note"
            >
=======
            
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
>>>>>>> db236c08759c2e840a2aef20384b93c9cb395343
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
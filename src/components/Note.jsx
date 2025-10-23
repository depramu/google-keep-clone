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


  // Fungsi handleCancel dari versi kedua, untuk membatalkan edit
  const handleCancel = () => {
    // Kembalikan teks ke kondisi semula sebelum edit
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  // Fungsi handleDelete yang lebih canggih dari versi kedua
  const handleDelete = () => {
    if (window.confirm("Delete this note?")) deleteNote(note.id);
  };

  const noteStyle = { backgroundColor: editColor };

  const handleRestore = () => {
    restoreNote(note.id);
  };


  return (
    <div className="note" style={noteStyle}>
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
            <button onClick={handleSave} className="note-button note-button-save">
              Save
            </button>
            <button
              onClick={handleCancel}
              className="note-button note-button-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Gunakan Tampilan View dengan logika trash dari versi kedua
        // 4. Nonaktifkan klik untuk edit jika di trash
        <div className="note-view" onClick={!isInTrash ? () => setIsEditing(true) : undefined}>
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>

          <div className="note-actions">
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
                  <path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l4 4l4-4H6a7 7 0 1 1 7 7a.5.5 0 0 0-1 0a8 8 0 1 0-8-8z" />
                </svg>
              </button>
            )}


            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="note-delete"
              title="Delete note"
            >
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
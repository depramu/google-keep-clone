import React, { useState } from "react";
import "./Note.css";

function Note({ note, updateNote, deleteNote }) {
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

  const handleDelete = () => {
    if (window.confirm("Delete this note?")) deleteNote(note.id);
  };

  const noteStyle = { backgroundColor: editColor };

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
        <div className="note-view" onClick={() => setIsEditing(true)}>
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>

          <div className="note-actions">
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

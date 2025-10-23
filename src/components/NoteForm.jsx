import React, { useState } from 'react';
import './NoteForm.css';

function NoteForm({ addNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState("#ffffff");

  // Palet warna custom kayak Google Keep
  const colorPalette = [
    "#ffffff", // default (putih)
    "#f28b82", // merah muda
    "#fbbc04", // kuning
    "#fff475", // krem
    "#ccff90", // hijau muda
    "#a7ffeb", // hijau toska
    "#cbf0f8", // biru muda
    "#aecbfa", // biru pastel
    "#d7aefb", // ungu lembut
    "#fdcfe8", // pink lembut
    "#e6c9a8", // coklat muda
    "#e8eaed", // abu-abu muda
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      addNote({ title, content, color });
      setTitle('');
      setContent('');
      setColor("#ffffff");
      setIsExpanded(false);
    }
  };

  return (
    <div className="note-form-container">
      <form
        className="note-form"
        onSubmit={handleSubmit}
        style={{ backgroundColor: color }}
      >
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-form-input"
            autoFocus
          />
        )}

        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={() => setIsExpanded(true)}
          className="note-form-textarea"
          rows={isExpanded ? 3 : 1}
        />

        {isExpanded && (
          <>
            <div className="color-palette">
              {colorPalette.map((clr, index) => (
                <button
                  key={index}
                  type="button"
                  className={`color-dot ${
                    color === clr ? "selected" : ""
                  }`}
                  style={{ backgroundColor: clr }}
                  onClick={() => setColor(clr)}
                  title={clr}
                />
              ))}
            </div>

            <div className="note-form-actions">
              <button type="submit" className="note-form-button">
                Add Note
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="note-form-button note-form-button-secondary"
              >
                Close
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default NoteForm;

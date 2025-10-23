import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import TrashList from './components/TrashList';
import './App.css';

function App() {
  // --- STATE ---
  const [notes, setNotes] = useState([]);
  // PENTING: State 'view' ini harus ada agar navigasi berfungsi
  const [view, setView] = useState('notes');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('keepDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // --- USEEFFECT ---
  useEffect(() => {
    const savedNotes = localStorage.getItem('keepNotes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('keepNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('keepDarkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  // --- FUNGSI-FUNGSI ---
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date().toISOString(),
      isTrashed: false,
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const trashNote = (id) => {
    setNotes(notes.map((note) => note.id === id ? { ...note, isTrashed: true } : note));
  };

  const restoreNote = (id) => {
    setNotes(notes.map((note) => note.id === id ? { ...note, isTrashed: false } : note));
  };

  const deletePermanently = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // --- FILTERING ---
  const activeNotes = notes.filter(note => !note.isTrashed);
  const trashedNotes = notes.filter(note => note.isTrashed);

  // --- RENDER ---
  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* BAGIAN INI YANG MENYEBABKAN ERROR JIKA SALAH */}
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigate={setView}  // <-- Pastikan ini ada!
        currentView={view}    // <-- Pastikan ini ada!
      />
      <main className="app-main">
        {view === 'notes' ? (
          <>
            <NoteForm addNote={addNote} />
            <NotesList
              notes={activeNotes}
              updateNote={updateNote}
              deleteNote={trashNote}
            />
          </>
        ) : (
          <TrashList
            notes={trashedNotes}
            restoreNote={restoreNote}
            deleteNote={deletePermanently}
          />
        )}
      </main>
    </div>
  );
}

export default App;
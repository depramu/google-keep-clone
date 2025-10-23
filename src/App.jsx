import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import TrashList from './components/TrashList.jsx'; 
import './App.css';

// tes

function App() {
  const [notes, setNotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('keepDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

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
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isTrashed: true } : note
      )
    );
  };

  
 
  const restoreNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isTrashed: false } : note
      )
    );
  };


   const deletePermanently = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };


  const activeNotes = notes.filter(note => !note.isTrashed);
  const trashedNotes = notes.filter(note => note.isTrashed);


  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="app-main">
        {/* <-- DITAMBAHKAN: Logika untuk mengganti tampilan */}
        {view === 'notes' ? (
          <>
            <NoteForm addNote={addNote} />
            <NotesList
              notes={activeNotes} // <-- DIUBAH: Tampilkan hanya notes yang aktif
              updateNote={updateNote}
              deleteNote={trashNote} // <-- DIUBAH: Gunakan fungsi trashNote
            />
          </>
        ) : (
          <TrashList
            notes={trashedNotes} // <-- Tampilkan notes yang di sampah
            restoreNote={restoreNote}
            deleteNote={deletePermanently}
          />
        )}
      </main>
    </div>
  );
}

export default App;

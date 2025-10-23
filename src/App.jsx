import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import TrashList from "./components/TrashList";
import "./App.css";

function App() {
  // --- STATE ---
  const [notes, setNotes] = useState([]);
  const [view, setView] = useState('notes');
  const [searchTerm, setSearchTerm] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("keepDarkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // --- USEEFFECT ---
  useEffect(() => {
    const savedNotes = localStorage.getItem("keepNotes");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map(note => ({
        ...note,
        isPinned: note.isPinned ?? false, 
        isTrashed: note.isTrashed ?? false, 
      }));
      setNotes(parsedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("keepNotes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("keepDarkMode", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  // --- FUNGSI-FUNGSI ---
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      // Hapus properti 'color' dari newNote
      // color: noteData.color || "#ffffff",
      theme: noteData.theme || "none", // theme ini juga bisa dihapus jika tidak digunakan
      createdAt: new Date().toISOString(),
      isTrashed: false,
      isPinned: noteData.isPinned || false, 
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const trashNote = (id) => {
    setNotes(notes.map((note) => note.id === id ? { ...note, isTrashed: true, isPinned: false } : note));
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const togglePin = (id) => {
    setNotes(notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  // --- FILTERING ---
  const filteredNotes = notes.filter(note =>
    (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeNotes = filteredNotes.filter(note => !note.isTrashed);
  const trashedNotes = filteredNotes.filter(note => note.isTrashed);

  // --- RENDER ---
  return (
    <div className="app">
      <Header
        onNavigate={setView}
        currentView={view}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />

      <main className="app-main">
        {view === 'notes' ? (
          <>
            <NoteForm addNote={addNote} />
            <NotesList
              notes={activeNotes}
              updateNote={updateNote}
              deleteNote={trashNote}
              togglePin={togglePin}
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
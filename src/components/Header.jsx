import React from 'react';
import './Header.css';

// Komponen Header sekarang menerima semua props yang dibutuhkan
function Header({ isDarkMode, toggleDarkMode, onNavigate, currentView, onSearch, searchTerm }) {
    return (
        <header className="header">
            <div className="header-content">
                
                {/* 1. BAGIAN KIRI: Logo dan Judul (Ujung Kiri) */}
                <div className="header-left">
                    {/* Branding: Logo dan Judul */}
                    <div className="header-brand">
                        <svg className="header-logo" width="40" height="40" viewBox="0 0 24 24">
                            <path fill="#fbc02d" d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                        </svg>
                        <h1 className="header-title">Keep</h1>
                    </div>
                </div>

                {/* 2. BAGIAN TENGAH: Input Pencarian (Di Tengah) */}
                {/* flex-grow: 1 akan mendorong ini ke tengah */}
                <div className="search-container">

                    {currentView === 'notes' && (
                        <input
                            type="text"
                            placeholder="Search by title or content"
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    )}
                </div>


                {/* 3. BAGIAN KANAN: Tombol Dark Mode & Navigasi (Ujung Kanan) */}
                {/* KELOMPOK BARU: Menggantikan header-right lama */}
                <div className="header-right">
                    
                    {/* Navigasi: Tombol Notes dan Trash */}
                    <nav className="header-nav">
                        <button
                            onClick={() => onNavigate('notes')}
                            className={currentView === 'notes' ? 'active' : ''}
                            aria-label="Notes"
                            title="Notes"
                        >
                            {/* Notes Icon (light bulb) */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onNavigate('trash')}
                            className={currentView === 'trash' ? 'active' : ''}
                            aria-label="Trash"
                            title="Trash"
                        >
                            {/* Trash Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5c-.11.83-.83 1.5-1.67 1.5H8.17c-.84 0-1.56-.67-1.67-1.5L5 9zm5 2v7h2v-7h-2zm4 0v7h2v-7h-2zm-8 0v7h2v-7H6zm6-8C11.45 1 11 1.45 11 2v1h2V2c0-.55-.45-1-1-1z"/>
                            </svg>
                        </button>
                    </nav>

                    {/* Tombol Dark Mode */}
                    <button
                        className={`dark-mode-toggle ${isDarkMode ? 'dark' : ''}`}
                        onClick={toggleDarkMode}
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDarkMode ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;

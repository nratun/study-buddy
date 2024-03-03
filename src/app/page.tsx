"use client"
import React, { useState } from 'react';
import { NoteCard } from "./components/notecards";

import { runGPTQuery } from "./components/chat";

export default function Home(): JSX.Element {
  return (
    <main>
      <div className="container">
        <div className="header">My Flashcards</div>
        
      </div>
      <NoteCard />
    </main>
  );
}
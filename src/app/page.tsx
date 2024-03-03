"use client"
import React, { useState } from 'react';
import { NoteCard } from "./components/notecards";

import { runGPTQuery } from "./components/chat";

export default function Home(): JSX.Element {
  return (
    <main>
      <div className="container">
        <div className="header">STUDY BUDDY</div>
        
      </div>
      <NoteCard />
    </main>
  );
}
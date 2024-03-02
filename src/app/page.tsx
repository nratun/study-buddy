"use client"
import { NavLink, BrowserRouter, Route, Routes } from "react-router-dom";
//import Navigate from "./components/navigation";
//import { Page1 } from "./components/page1";
//import { Page2 } from "./components/page2";
import { NoteCard } from "./components/notecards";
import React from "react";

export default function Home(): JSX.Element {
  return (
    <main>
        <div className="flex-col items-center justify-between p-20">
          <div className="font-mono">My Flashcards</div>
            <NoteCard />
        </div>
    </main>
  );
}



{/* <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hii
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        hello
      </div>
    </main> */}

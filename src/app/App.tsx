import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page';
import Page1 from './components/page1';
import Page2 from './components/page2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </Router>
  );
}

//HOMEPAGE
{/* <main>
        <div className="flex-col items-center justify-between p-20">
          <div className="font-mono">My Flashcards</div>
        </div>
        <div className="cards">
          <div className="card">
            Here's a card
            </div>
          <div className="card">here's another card</div>
          <div className="card">Here's a card 3</div>
          <div className="card">here's 4</div>
          <div className="card">here's 5</div>
          <div className="card">here's 6</div>
        </div>
        
    </main> */}


export default App;

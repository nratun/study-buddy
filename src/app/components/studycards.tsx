import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import styles from '../studystyles.module.css';

interface StudyCardsProps {
  cards: { question: string; answer: string }[];
}

export const StudyCards: React.FC<StudyCardsProps> = ({ cards }) => {
    const [currCardInd, setCurrCardInd] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);

    function changeVisibility(): void {
        setVisible(!visible);
    }
    
    const nextCard = () => {
      setCurrCardInd((prevInd) => (prevInd + 1) % cards.length);
      setVisible(false);
    };
  
    const prevCard = () => {
      setCurrCardInd((prevInd) => (prevInd - 1 + cards.length) % cards.length);
      setVisible(false);
    };
  
    // Check if cards array is empty
    if (cards.length === 0) {
      return <div>No cards available for study.</div>;
    }
  
    const currCard = cards[currCardInd];
    const begin = currCardInd === 0;
    const end = currCardInd === cards.length - 1;
  
    return (
        <div className={styles["study-cards-container"]}> 
          <div className={styles["note-card-container"]}>
            <button onClick={prevCard} disabled={begin}>Previous</button>
            <div className={styles["note-card"]}>
              <div>
                <h3>Question:</h3>
                <p>{cards[currCardInd].question}</p>
              </div>
              <div className="show-answer-button">
                <Button onClick={changeVisibility}>Reveal Answer</Button>
                {visible && (
                  <div>
                    <h3>Answer:</h3>
                    <p>{cards[currCardInd].answer}</p>
                  </div>
                )}
              </div>
            </div>
            <button onClick={nextCard} disabled={end}>Next</button>
          </div>
        </div>
      );
  };
  

import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import styles from '../studystyles.module.css';
import { runGPTQuery } from "./chat";

interface StudyCardsProps {
  cards: { question: string; answer: string; feedback?: FeedbackType | null }[];
  setCards: React.Dispatch<React.SetStateAction<{ question: string; answer: string; editMode: boolean }[]>>;
}

type FeedbackType = 'good' | 'unsure' | 'bad';

export const StudyCards: React.FC<StudyCardsProps> = ({ cards, setCards }) => {
  const [currCardInd, setCurrCardInd] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const [results, setResult] = useState<boolean>(false);
  const [feedbackCounts, setFeedbackCounts] = useState<{ good: number; unsure: number; bad: number }>({ good: 0, unsure: 0, bad: 0 });
  const [response, setResponse] = useState<string>(''); // Moved to the top
  const [strCards, setStrCards] = useState<string>('');

  useEffect(() => {
      // Count the occurrences of each feedback type
      const counts = cards.reduce((acc, card) => {
          if (card.feedback) {
              acc[card.feedback]++;
          }
          return acc;
      }, { good: 0, unsure: 0, bad: 0 });
      setFeedbackCounts(counts);
  }, [cards]);

    function changeVisibility(): void {
      setVisible(!visible);
    }

    const resetFeedback = () => {
        setFeedbackCounts({ good: 0, unsure: 0, bad: 0 });
    };

    function changeResultVisibility(): void {
      setResult(!results);
    }

    const nextCard = () => {
      setCurrCardInd((prevInd) => (prevInd + 1) % cards.length);
      setVisible(false);
    };
  
    const prevCard = () => {
      setCurrCardInd((prevInd) => (prevInd - 1 + cards.length) % cards.length);
      setVisible(false);
    };


    const handleFeedback = (type: FeedbackType) => {
        if (cards[currCardInd].feedback) return; // If feedback already given, do nothing
        
        // Update the feedback for the current card
        cards[currCardInd].feedback = type;
        setFeedbackCounts(prevCounts => ({
          ...prevCounts,
          [type]: prevCounts[type] + 1,
      }));

        // Move to the next card
        nextCard();
    };

    // Check if cards array is empty
    if (cards.length === 0) {
      return <div>No cards available for study.</div>;
    }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Prevent default button behavior
    try {
      const cardsAsString = "[" + cards.map(card => `{Question: ${card.question}, Answer: ${card.answer}, Feedback: null`).join(', ') + "]";
      setStrCards(cardsAsString);
      const result = await runGPTQuery("Generate 5 sets of questions and answers related to the same topic but NOT the same content as the following question and answer pairs, and put them in array of cards like so: " + cardsAsString); // Call the runGPTQuery function with the desired question
      if (result.success) {
        setResponse(result.message); // Update state with the response message
        const generatedCards = JSON.parse(result.message);
      // Convert the generated cards to the desired format
      const newCards = generatedCards.map((item: any) => ({
        question: item.Question,
        answer: item.Answer,
        feedback: item.Feedback
      }));
      // Add the generated cards to the existing list of cards
      setCards(cards => [...cards, ...newCards]);
      } else {
        console.error('Failed with finish_reason:', result.finish_reason);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    const currCard = cards[currCardInd];
    const begin = currCardInd === 0;
    const end = currCardInd === cards.length - 1;

    return (
      <div className={styles["study-cards-container"]}>
          {results ? (
              <div>
                  <h3>Feedback Counts:</h3>
                  <p>Good: {feedbackCounts.good}</p>
                  <p>Unsure: {feedbackCounts.unsure}</p>
                  <p>Bad: {feedbackCounts.bad}</p>
                  <Button onClick={resetFeedback}>Retry</Button>
              </div>
              
          ) : (
              <div className={styles["note-card-container"]}>
                  <button onClick={prevCard} disabled={begin}>
                      Previous
                  </button>
                  <div className={styles["note-card"]}>
                      <div>
                          <h3>Question:</h3>
                          <p>{currCard.question}</p>
                      </div>
                      <div className="show-answer-button">
                      <Button onClick={changeVisibility}>
                                {visible ? 'Hide Answer' : 'Reveal Answer'}
                            </Button>
                          {visible && (
                              <div>
                                  <h3>Answer:</h3>
                                  <p>{currCard.answer}</p>
                                  <div>
                                      <Button
                                          onClick={() => handleFeedback('good')}
                                          disabled={currCard.feedback === 'good' || currCard.feedback === 'unsure' || currCard.feedback === 'bad'}
                                      >
                                          Good
                                      </Button>
                                      <Button
                                          onClick={() => handleFeedback('unsure')}
                                          disabled={currCard.feedback === 'good' || currCard.feedback === 'unsure' || currCard.feedback === 'bad'}
                                      >
                                          Unsure
                                      </Button>
                                      <Button
                                          onClick={() => handleFeedback('bad')}
                                          disabled={currCard.feedback === 'good' || currCard.feedback === 'unsure' || currCard.feedback === 'bad'}
                                      >
                                          Bad
                                      </Button>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
                  <button onClick={nextCard} disabled={end}>
                      Next
                  </button>
                  <Button onClick={changeResultVisibility}>Finish Studying</Button>
                  <button onClick={(event) => handleSubmit(event)}>Generate Similar</button>
                  {/* Display the response */}
                  <div>
                    <p>Generated Questions:</p>
                    <p>{response}</p>
                  </div>     
              </div>
          )}
      </div>
  );
};
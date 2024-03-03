import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import '../cardstyles.css';
import { StudyCards } from './studycards';

export function NoteCard(): JSX.Element {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [cards, setCards] = useState<{ question: string; answer: string; editMode: boolean }[]>([]);

  function updateQuestion(event: React.ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value);
  }

  function updateAnswer(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
  }

  function saveCard() {
    if (question && answer) {
      setCards([...cards, { question, answer, editMode: false }]);
      setQuestion('');
      setAnswer('');
    }
  }

  function updateCard(index: number, newQuestion: string, newAnswer: string) {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], question: newQuestion, answer: newAnswer };
    setCards(updatedCards);
  }

  function deleteCard(index: number) {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  }

  function toggleEditMode(index: number) {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], editMode: !updatedCards[index].editMode };
    setCards(updatedCards);
  }

  function cancelEdit(index: number) {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], editMode: false };
    setCards(updatedCards);
  }

  return (
    <div className="study-page">
      <Form.Group controlId="formQuestion">
        <Form.Label>Enter Question: </Form.Label>
        <Form.Control
          type="text"
          value={question}
          onChange={updateQuestion}
        />
      </Form.Group>
      <Form.Group controlId="formAnswer">
        <Form.Label>Enter Answer: </Form.Label>
        <Form.Control
          type="text"
          value={answer}
          onChange={updateAnswer}
        />
      </Form.Group>
      <Button onClick={saveCard}>Create Card</Button>
      {cards.map((card, index) => (
        <div key={index} className="note-card">
          <div className="note-card-content">
            {card.editMode ? (
              <>
                <div className="question-card">
                  <Form.Group controlId={`editQuestion_${index}`}>
                    <Form.Label>Edit Question:</Form.Label>
                    <Form.Control
                      type="text"
                      value={card.question}
                      onChange={(e) => updateCard(index, e.target.value, card.answer)}
                    />
                  </Form.Group>
                </div>
                <div className="answer-card">
                  <Form.Group controlId={`editAnswer_${index}`}>
                    <Form.Label>Edit Answer:</Form.Label>
                    <Form.Control
                      type="text"
                      value={card.answer}
                      onChange={(e) => updateCard(index, card.question, e.target.value)}
                    />
                  </Form.Group>
                </div>
                <Button onClick={() => toggleEditMode(index)}>Save</Button>
                <Button onClick={() => cancelEdit(index)}>Cancel</Button>
              </>
            ) : (
              <>
                <div className="question-card">
                  <h3>Question:</h3>
                  <p>{card.question}</p>
                </div>
                <div className="answer-card">
                  <h3>Answer:</h3>
                  <p>{card.answer}</p>
                </div>
                <Button onClick={() => toggleEditMode(index)}>Edit</Button>
                <Button onClick={() => deleteCard(index)}>Delete</Button>
              </>
            )}
          </div>
        </div>
      ))}
      <StudyCards cards={cards} />
    </div>
  );
}

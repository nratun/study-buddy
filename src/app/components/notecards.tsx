import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
//import './cardstyles.css';

export function NoteCard(): JSX.Element {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
//   const [savedQuestion, setSavedQuestion] = useState('');
//   const [savedAnswer, setSavedAnswer] = useState('');
  const [cards, setCards] = useState<{question: string; answer: string }[]>([]);


  function updateQuestion(event: React.ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value);
  }
  function updateAnswer(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
  }
  function saveCard() {
    if (question && answer) {
        setCards([...cards, {question, answer}]);
        setQuestion('');
        setAnswer('');
    }
  }

  function updateCard(index: number, newQuestion: string, newAnswer: string) {
    const updatedCards = [...cards];
    updatedCards[index] = { question: newQuestion, answer: newAnswer };
    setCards(updatedCards);
  }

  return (
    <div>
        <span>
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
        <div key={index}>
          <h3>Note {index + 1}:</h3>
          <p>Question: {card.question}</p>
          <p>Answer: {card.answer}</p>
          <div>
            <Form.Group controlId={`editQuestion_${index}`}>
              <Form.Label>Edit Question:</Form.Label>
              <Form.Control
                type="text"
                value={card.question}
                onChange={(e) => updateCard(index, e.target.value, card.answer)}
              />
            </Form.Group>
            <Form.Group controlId={`editAnswer_${index}`}>
              <Form.Label>Edit Answer:</Form.Label>
              <Form.Control
                type="text"
                value={card.answer}
                onChange={(e) => updateCard(index, card.question, e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
      ))}
        </span>
    </div>
  );
}

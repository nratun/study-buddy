"use client"
import React, { useState } from 'react';
import { NoteCard } from "./components/notecards";
import { runGPTQuery } from "./components/chat";

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
// export default function Home(): JSX.Element {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState<string>('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Prevent default form submission behavior
//     try {
//       const result = await runGPTQuery(input); // Call the runGPTQuery function with user input
//       if (result.success) {
//         setResponse(result.message); // Update state with the response message
//       } else {
//         console.error('Failed with finish_reason:', result.finish_reason);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <main>
//       <div className="flex-col items-center justify-between p-20">
//         <div className="font-mono">My Flashcards</div>
//         <NoteCard />
//         {/* Form for user input */}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={input}
//             onChange={handleInputChange}
//             placeholder="Enter your query"
//           />
//           <button type="submit">Submit</button>
//         </form>

//         {/* Display the response */}
//         <div>
//           <p>Response:</p>
//           <p>{response}</p>
//         </div>
//       </div>
//     </main>
//   );
// }


import React, { useState } from 'react';

function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setErrorMessage('Please enter a question.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/ask-question/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          question: question,
          filename: 'example.pdf', // Update as needed to reflect actual file logic
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAnswer(data.answer || 'No answer found for your question.');
        setErrorMessage(''); // Clear error message on success
      } else {
        setErrorMessage(data.error || 'Failed to retrieve an answer.');
      }
    } catch (error) {
      console.error('Error during question submission:', error);
      setErrorMessage('An error occurred while fetching the answer. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask a question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            setErrorMessage(''); // Clear error message as user types
          }}
        />
        <button type="submit">Ask</button>
      </form>
      <div>
        {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
        {answer && !errorMessage && <p>Answer: {answer}</p>}
      </div>
    </div>
  );
}

export default QuestionForm;

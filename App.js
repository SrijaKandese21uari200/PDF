import React from 'react';
import FileUpload from './FileUpload';
import QuestionForm from './QuestionForm';

function App() {
  return (
    <div>
      <h1>PDF Question Answering System</h1>
      <FileUpload />
      <QuestionForm />
    </div>
  );
}

export default App;

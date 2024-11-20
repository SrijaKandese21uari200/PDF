import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState([]);
  const [fileName, setFileName] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setUploadMessage('');
    setAnswer([]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload-file/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setUploadMessage(`Error: ${data.error}`);
      } else {
        setUploadMessage(data.message || "File uploaded successfully.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setUploadMessage("Failed to upload the file. Please try again.");
    }
  };

  const handleQuestionSubmit = async () => {
    if (!question) {
      alert("Please ask a question.");
      return;
    }

    if (!fileName) {
      alert("Please upload a PDF before asking a question.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/ask-question/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          filename: fileName,
          question: question,
        }),
      });

      const data = await response.json();
      if (data.related_sentences && data.related_sentences.length > 0) {
        setAnswer(data.related_sentences);
      } else {
        setAnswer(["No related content found."]);
      }
    } catch (error) {
      console.error("Error during question submission:", error);
      setAnswer(["Failed to get an answer. Please try again."]);
    }
  };

  return (
    <div className="App">
      <h1>PDF Question Answering System</h1>

      <div>
        <h3>Upload PDF Document</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload PDF</button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>

      <div>
        <h3>Ask a Question</h3>
        <input 
          type="text" 
          placeholder="Ask a question..." 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
        />
        <button onClick={handleQuestionSubmit}>Ask</button>
        {answer.length > 0 && (
          <div>
            <h4>Related Sentences:</h4>
            <ul>
              {answer.map((sentence, index) => (
                <li key={index}>{sentence}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;

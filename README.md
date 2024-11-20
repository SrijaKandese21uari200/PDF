Application Overview

This application is a comprehensive project with both frontend and backend components. It serves as a dynamic platform for user interactions, pdf uploads, and data processing. 


Features
 Frontend: Built with React.js for an interactive user experience, supporting form submissions and file uploads.
 Backend: Developed with Python(FastAPI) for efficient server-side processing and API management.
 HTTP: Facilitates seamless communication between the frontend and backend.
 Scalable Architecture: Can be easily extended for additional features.
 Responsive Design: Ensures usability across various devices.


Project Structure

The project is divided into two main components:

Source_Code/
├── backend/
│   ├── main.py            # Core backend application logic and API endpoints
│   ├── requirements.txt   # Dependencies for running the backend
│
├── frontend/
│   ├── src/
│   │   ├── App.css        # Styling for the React components
│   │   ├── App.js         # Main application logic and routing
│   │   ├── App.test.js    # Test cases for the App.js component
│   │   ├── FileUpload.js  # React component for handling file uploads
│   │   ├── QuestionForm.js # React component for handling form inputs
│   │   ├── index.css      # Global styles for the frontend
│   │   ├── index.js       # Entry point for the React application
│   │   ├── logo.svg       # Logo used in the application
│   │   ├── reportWebVitals.js # Utility for measuring app performance
│   │   ├── setupTests.js  # Configuration for testing
```


Prerequisites

Before running the application, ensure you have the following installed:
Python: Version 3.8 or higher.
Node.js: Version 14 or higher.


Setup Instructions

Backend Setup
1. Navigate to the Backend Directory:
   
   cd backend
   

2. Install Dependencies:
   Install the required Python packages listed in `requirements.txt`:
  
   pip install -r requirements.txt
   

3. Run the Backend Server:
   Start the backend service by running the main Python script:
   
   uvicorn main:app --reload
   
   The server should start, and you can access the API at `http://127.0.0.1:8000`.


 Frontend Setup
1. Navigate to the Frontend Directory:
   
   cd frontend

2. Install Dependencies:
   Install the Node.js modules listed in `package.json`:

   npm install


3. Start the Frontend Development Server:
   Run the following command to launch the React application:
   npm start

   The app will open in your default web browser at `http://localhost:3000`.


API Documentation

The backend provides RESTful endpoints for handling various operations. Below are the primary endpoints:

1. File Upload:
   Endpoint: `POST /upload`
   Description: Accepts a file from the frontend for processing.
   Payload: `multipart/form-data`
   Response: JSON with status and result.

2. Form Submission:
   Endpoint: `POST /submit`
   Description: Handles data submitted from the `QuestionForm` component.
   Payload: JSON object containing user inputs.
   Response: JSON with a success message.


Application Architecture

Frontend
Technology: React.js
Key Components:
  `FileUpload.js`: Manages file uploads via user interaction.
  `QuestionForm.js`: Handles user-submitted forms and integrates with the backend.

Backend
Technology: Python(FastAPI).
Features:
  - Handles API requests and responses.
  - Processes files and form data.

Data Flow
1. Frontend: Users interact via forms or file uploads.
2. Backend: Processes requests, validates data, and performs required operations.
3. Frontend: Displays the results dynamically.


Testing

Backend Testing
Run backend tests using:
  
  python -m unittest
  

Frontend Testing
Run frontend tests using:
  
    npm test
 

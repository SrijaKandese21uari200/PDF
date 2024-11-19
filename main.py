from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pdfplumber
from typing import Dict, List

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store extracted text
pdf_texts: Dict[str, str] = {}

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}

# Upload file and extract text
@app.post("/upload-file/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Log file name
        print(f"Received file: {file.filename}")

        # Read file content
        content = await file.read()
        print(f"File content size: {len(content)}")

        # Rewind the file pointer for pdfplumber
        file.file.seek(0)

        # Extract text from PDF
        with pdfplumber.open(file.file) as pdf:
            extracted_text = ""
            for page in pdf.pages:
                extracted_text += page.extract_text() or ""

        # Store the text in memory
        pdf_texts[file.filename] = extracted_text
        return {"filename": file.filename, "content_size": len(content), "message": "PDF processed and stored."}
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return {"error": f"Failed to process the PDF. Error: {str(e)}"}

# Question answering endpoint
@app.post("/ask-question/")
def ask_question(filename: str = Form(...), question: str = Form(...)):
    if filename not in pdf_texts:
        return {"error": "PDF not found. Please upload the file first."}

    # Get the text from the PDF
    document_text = pdf_texts[filename]

    # Find related sentences
    related_sentences = [
        sentence.strip() for sentence in document_text.split(". ")
        if question.lower() in sentence.lower()
    ]

    if related_sentences:
        return {"related_sentences": related_sentences}
    else:
        return {"related_sentences": [], "message": "No related content found."}

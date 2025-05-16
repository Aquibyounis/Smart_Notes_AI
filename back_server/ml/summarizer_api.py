import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import os

# Set up logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# Set environment variable to disable TensorFlow warnings
os.environ["TRANSFORMERS_NO_TF"] = "1"
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# 🔁 Chunking function
def split_text(text, max_chunk_size=1000):
    sentences = text.split('. ')
    chunks = []
    current_chunk = ''
    for sentence in sentences:
        if len(current_chunk) + len(sentence) + 1 <= max_chunk_size:
            current_chunk += sentence + '. '
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence + '. '
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks

# 🧠 Summarization endpoint
@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get("text", "")
    
    # Debugging log: Log received text
    logging.debug(f"Received text: {text[:100]}...")  # Log the first 100 characters

    if not text:
        return jsonify({"error": "No text provided"}), 400

    chunks = split_text(text)
    
    # Debugging log: Log chunk count and example chunk
    logging.debug(f"Text split into {len(chunks)} chunks. First chunk: {chunks[0][:100]}...")

    summaries = []
    
    # Summarizing each chunk
    for chunk in chunks:
        logging.debug(f"Summarizing chunk: {chunk[:100]}...")  # Log the first 100 characters of the chunk
        try:
            summary = summarizer(chunk, max_length=120, min_length=30, do_sample=False)
            summaries.append(summary[0]['summary_text'])
        except Exception as e:
            logging.error(f"Error summarizing chunk: {e}")
            summaries.append("[Error summarizing chunk]")

    final_summary = "\n\n".join(summaries)
    
    # Debugging log: Log the final summary (first 100 characters)
    logging.debug(f"Final summary: {final_summary[:100]}...")

    return jsonify({"summary": final_summary})

if __name__ == '__main__':
    app.run(port=5001)

import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import notesRouter from './routes/note.js'; // ✅ import your notes route

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Mount the notes API route
app.use('/api/notes', notesRouter);

// 🔁 Summarization Route
app.post('/api/summarize', async (req, res) => {
    const { text } = req.body;
    console.log("Received text for summarization:", text.slice(0, 100) + "...");

    try {
        console.log("Sending request to Flask API:", { text });
        const response = await axios.post('http://127.0.0.1:5001/summarize', { text });
        console.log("Flask response:", response.data);

        res.json({ summary: response.data.summary });
    } catch (error) {
        console.error("Error calling summarizer API:", error.message);
        if (error.response) {
            console.error("Error response:", error.response.data);
        }
        res.status(500).json({ error: 'Failed to summarize text' });
    }
});

// ✅ Connect to MongoDB before starting the server
mongoose.connect('mongodb+srv://aquib:Luciferbad%40007@clusterall.yv4ah.mongodb.net/SmartNotes', {
    useNewUrlParser: true,  // Remove if unnecessary in MongoDB driver version 4.0.0+
    useUnifiedTopology: true, // Remove if unnecessary in MongoDB driver version 4.0.0+
})
.then(() => {
    console.log("MongoDB connected");
    app.listen(5050, () => {
        console.log("Node.js server is running on http://localhost:5050");
    });
})
.catch((err) => {
    console.error("MongoDB connection failed:", err.message);
});

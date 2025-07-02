const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EventModel = require('./eventModel');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/events', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// POST: Add a new event
app.post('/events', (req, res) => {
    const newEvent = new EventModel(req.body);
    newEvent.save()
        .then(event => res.status(201).json(event))
        .catch(err => res.status(400).json({ error: err.message }));
});

// PUT: Update an existing event
app.put('/events/:id', (req, res) => {
    const { id } = req.params;
    EventModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
            res.json(event);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE: Delete an event by ID
app.delete('/events/:id', (req, res) => {
    const { id } = req.params;
    EventModel.findByIdAndDelete(id)
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
            res.status(204).end();
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// GET: Fetch all events
app.get('/events', (req, res) => {
    EventModel.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

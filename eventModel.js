const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    location: String,
    description: String,
    people: Number
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
// server/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new event
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/events/:id
router.delete('/:id', async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error });
    }
  });  

module.exports = router;

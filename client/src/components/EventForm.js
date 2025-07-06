// src/components/EventForm.js

import React, { useState } from 'react';
import axios from 'axios';

function EventForm({ onEventCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newEvent = { title, description, date };
      const res = await axios.post('http://localhost:5000/api/events', newEvent);
      onEventCreated(res.data); // Notify parent to refresh event list
      setTitle('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Create New Event</h2>

      <input
        className="w-full border p-2 mb-3 rounded"
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 mb-3 rounded"
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 mb-3 rounded"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        type="submit"
      >
        Add Event
      </button>
    </form>
  );
}

export default EventForm;


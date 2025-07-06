// src/App.js

import EventForm from './components/EventForm';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './components/EventCard';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">College Event Aggregator</h1>
  
      <EventForm onEventCreated={(event) => setEvents([event, ...events])} />
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
  <EventCard
    key={event._id}
    event={event}
    onDelete={(id) => setEvents(events.filter(e => e._id !== id))}
  />
))}

      </div>
    </div>
  );  
}

export default App;

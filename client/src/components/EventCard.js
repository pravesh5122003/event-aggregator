import React from 'react';
import axios from 'axios';

function EventCard({ event, onDelete }) {
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${event._id}`);
      onDelete(event._id); // Notify parent
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition relative">
      <h2 className="text-xl font-semibold text-blue-800">{event.title}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm text-gray-500 mt-2">Date: {event.date}</p>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
      >
        ✖
      </button>
    </div>
  );
}

export default EventCard;


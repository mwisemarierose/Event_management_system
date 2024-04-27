import React, { useState } from 'react';

const BookingForm = ({ event }) => {
  const [numTickets, setNumTickets] = useState(1);

  const handleTicketChange = (e) => {
    setNumTickets(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log(`Booking ${numTickets} tickets for ${event.title}`);
  };

  return (
    <div className="bg-black p-6 rounded-lg shadow-md w-1/3">
      <h2 className="text-2xl font-bold mb-4">Book Tickets</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="numTickets" className="block font-bold mb-2">
            Number of Tickets:
          </label>
          <input
            type="number"
            id="numTickets"
            value={numTickets}
            onChange={handleTicketChange}
            min="1"
            max="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Book Tickets
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
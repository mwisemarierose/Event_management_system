import React,{useState, useEffect} from "react";
import SingleService from "./Cards";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/event/all");
        setEvents(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-100 py-12 w-auto">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Events</h1>
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <SingleService key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;

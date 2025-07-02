import React, { useState, useEffect } from 'react';
import axios from 'axios';


const apiUrl = 'http://localhost:5000/events';

function Event() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    date: '',
    location: '',
    description: '',
    people: ''
  });

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const event = {
      name: formData.name,
      date: formData.date,
      location: formData.location,
      description: formData.description,
      people: parseInt(formData.people)
    };

    try {
      if (formData.id) {
        // Update existing event
        await axios.put(`${apiUrl}/${formData.id}`, event);
        alert('Event updated successfully!');
      } else {
        // Create new event
        await axios.post(apiUrl, event);
        alert('Event added successfully!');
      }

      setFormData({
        id: '',
        name: '',
        date: '',
        location: '',
        description: '',
        people: ''
      });

      // Optionally fetch events after submission
      // fetchEvents(); // If you want to fetch after each submit, uncomment this line

    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // Handle delete event
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        alert('Event deleted successfully!');
        fetchEvents(); // Fetch updated list after deletion
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  // Handle edit event
  const handleEdit = (event) => {
    setFormData({
      id: event._id,
      name: event.name,
      date: event.date,
      location: event.location,
      description: event.description,
      people: event.people
    });
  };

  useEffect(() => {
    // Fetch events only when explicitly triggered by the button click
    // fetchEvents();
  }, []); // Removed the auto-fetch here

  const styles = {
    body: {
      minHeight: '100vh',
      margin: 0,
      padding: '2rem 0',
      fontFamily: "'Roboto', sans-serif",
      backgroundImage: "url('./EVENT.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '90%',
      maxWidth: '1100px',
      minHeight: '80vh',
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.92)',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      overflowY: 'auto',
    },
    heading: {
      fontFamily: "'Pacifico', cursive",
      color: '#6a1b9a',
      textShadow: '2px 2px 4px #fff',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    card: {
      padding: '1rem',
      background: '#fff',
      borderLeft: '5px solid #d81b60',
      borderRadius: '15px',
      transition: 'transform 0.2s ease-in-out',
    },
    btnPrimary: {
      backgroundColor: '#007bff',
      color: '#fff',
      width: '50%',
    },
    btnFetch: {
      backgroundColor: '#4db6ac',
      color: '#fff',
      width: '50%',
    },
    btnWarning: {
      backgroundColor: '#ffd54f',
      color: '#000',
    },
    btnDanger: {
      backgroundColor: '#e57373',
      color: '#fff',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🎉 Event Management System</h2>

        <div className="card p-4 shadow-lg bg-light mb-4" style={styles.card}>
          <form onSubmit={handleSubmit}>
            <input type="hidden" value={formData.id} />
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Event Name</label>
                <select
                  className="form-select"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choose...</option>
                  <option>Wedding</option>
                  <option>Birthday Party</option>
                  <option>Corporate Meeting</option>
                  <option>Conference</option>
                  <option>Concert</option>
                  <option>Workshop</option>
                  <option>Festival</option>
                  <option>Charity Event</option>
                  <option>Exhibition</option>
                  <option>Sports Event</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Event Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Event Location</label>
                <select
                  className="form-select"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choose...</option>
                  <option>New York</option>
                  <option>London</option>
                  <option>Paris</option>
                  <option>Tokyo</option>
                  <option>Delhi</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">No. of People</label>
                <input
                  type="number"
                  className="form-control"
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Event Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                style={styles.btnPrimary}
              >
                Submit Event
              </button>
              <button
                type="button"
                className="btn"
                style={styles.btnFetch}
                onClick={fetchEvents}
              >
                Fetch Events
              </button>
            </div>
          </form>
        </div>

        <div className="row">
          {events.map((event) => (
            <div key={event._id} className="col-md-4 mb-3">
              <div className="card" style={styles.card}>
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text"><strong>Date:</strong> {event.date}</p>
                  <p className="card-text"><strong>Location:</strong> {event.location}</p>
                  <p className="card-text"><strong>Description:</strong> {event.description}</p>
                  <p className="card-text"><strong>People:</strong> {event.people}</p>
                  <button
                    className="btn btn-warning"
                    style={styles.btnWarning}
                    onClick={() => handleEdit(event)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    style={styles.btnDanger}
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Event;
import React, { useState } from 'react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    { id: 1, customer: 'John Doe', room: 101, date: '2025-07-23', status: 'Confirmed' },
    { id: 2, customer: 'Jane Smith', room: 102, date: '2025-07-24', status: 'Pending' },
  ]);
  const [form, setForm] = useState({ customer: '', room: '', date: '', status: 'Pending' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.customer || !form.room || !form.date) return;
    setBookings([...bookings, { id: bookings.length + 1, ...form }]);
    setForm({ customer: '', room: '', date: '', status: 'Pending' });
  };

  return (
    <div className="module-container">
      <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem'}}>
        <img src="/hotel-icon.svg" alt="Hotel Icon" style={{width: '60px', height: '60px'}} />
        <h2 style={{margin: 0, fontSize: '2rem', color: '#2d3e50'}}>Booking Management</h2>
      </div>
      <div style={{background: '#f9fafc', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 6px rgba(44,62,80,0.07)'}}>
        <form className="module-form" onSubmit={handleSubmit} style={{gap: '1rem', flexWrap: 'wrap'}}>
          <input name="customer" type="text" placeholder="Customer Name" value={form.customer} onChange={handleChange} required style={{flex: '1 1 180px'}} />
          <input name="room" type="number" placeholder="Room No." value={form.room} onChange={handleChange} required style={{flex: '1 1 120px'}} />
          <input name="date" type="date" value={form.date} onChange={handleChange} required style={{flex: '1 1 160px'}} />
          <select name="status" value={form.status} onChange={handleChange} style={{flex: '1 1 120px'}}>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>
          <button type="submit" style={{flex: '1 1 120px', minWidth: '120px'}}>Add Booking</button>
        </form>
      </div>
      <div style={{overflowX: 'auto'}}>
        <table className="module-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer}</td>
                <td>{booking.room}</td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;

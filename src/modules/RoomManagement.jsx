import React from 'react';

import { useState } from 'react';
const RoomManagement = () => {
  const [rooms, setRooms] = useState([
    { id: 101, type: 'Deluxe', status: 'Available', price: 120 },
    { id: 102, type: 'Suite', status: 'Occupied', price: 200 },
    { id: 103, type: 'Standard', status: 'Available', price: 80 },
  ]);
  const [form, setForm] = useState({ id: '', type: '', status: 'Available', price: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.id || !form.type || !form.price) return;
    setRooms([...rooms, { ...form, price: Number(form.price) }]);
    setForm({ id: '', type: '', status: 'Available', price: '' });
  };

  return (
    <div className="module-container">
      <h2>Room Management</h2>
      <img src="/hotel-icon.svg" alt="Hotel Icon" style={{width: '60px', height: '60px', display: 'block', margin: '0 auto 1.5rem auto'}} />
      <form className="module-form" onSubmit={handleSubmit}>
        <input name="id" type="number" placeholder="Room No." value={form.id} onChange={handleChange} required />
        <input name="type" type="text" placeholder="Type" value={form.type} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </select>
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">Add Room</button>
      </form>
      <table className="module-table">
        <thead>
          <tr>
            <th>Room No.</th>
            <th>Type</th>
            <th>Status</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.type}</td>
              <td>{room.status}</td>
              <td>${room.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomManagement;

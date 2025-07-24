import React, { useState } from 'react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
  ]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setCustomers([...customers, { id: customers.length + 1, ...form }]);
    setForm({ name: '', email: '', phone: '' });
  };

  return (
    <div className="module-container">
      <h2>Customer Management</h2>
      <img src="/hotel-icon.svg" alt="Hotel Icon" style={{width: '60px', height: '60px', display: 'block', margin: '0 auto 1.5rem auto'}} />
      <form className="module-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <button type="submit">Add Customer</button>
      </form>
      <table className="module-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;

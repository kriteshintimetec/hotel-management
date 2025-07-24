import React from 'react';

const Dashboard = () => {
  // Example stats
  const stats = {
    rooms: 3,
    bookings: 2,
    customers: 2,
    revenue: 400
  };

  return (
    <div className="module-container">
      <h2>Dashboard</h2>
      <img src="/hotel-icon.svg" alt="Hotel Icon" style={{width: '80px', height: '80px', display: 'block', margin: '0 auto 2rem auto'}} />
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Rooms</h3>
          <p>{stats.rooms}</p>
        </div>
        <div className="stat-card">
          <h3>Bookings</h3>
          <p>{stats.bookings}</p>
        </div>
        <div className="stat-card">
          <h3>Customers</h3>
          <p>{stats.customers}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>${stats.revenue}</p>
        </div>
      </div>
      <p>Overview of hotel statistics and quick actions.</p>
    </div>
  );
};

export default Dashboard;

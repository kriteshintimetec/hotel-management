import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Dashboard from './modules/Dashboard';
import RoomManagement from './modules/RoomManagement';
import BookingManagement from './modules/BookingManagement';
import CustomerManagement from './modules/CustomerManagement';
import Auth from './modules/Auth';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = t => {
    setToken(t);
    localStorage.setItem('token', t);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard token={token} />;
      case 'room':
        return <RoomManagement token={token} />;
      case 'booking':
        return <BookingManagement token={token} />;
      case 'customer':
        return <CustomerManagement token={token} />;
      default:
        return <Dashboard token={token} />;
    }
  };

  if (!token) {
    return <Auth setToken={handleSetToken} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>Hotel Management System</h1>
        <nav className="app-nav">
          <button onClick={() => setActiveModule('dashboard')}>Dashboard</button>
          <button onClick={() => setActiveModule('room')}>Room Management</button>
          <button onClick={() => setActiveModule('booking')}>Booking Management</button>
          <button onClick={() => setActiveModule('customer')}>Customer Management</button>
          <button onClick={() => { setToken(''); localStorage.removeItem('token'); }}>Logout</button>
        </nav>
      </header>
      <main className="app-main">
        {renderModule()}
      </main>
    </div>
  );
}

export default App

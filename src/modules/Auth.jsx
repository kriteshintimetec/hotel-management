import React, { useState } from 'react';
import { login, register } from '../api';

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await login(form.username, form.password);
        setToken(res.data.token);
      } else {
        await register(form.username, form.password);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="module-container" style={{maxWidth: 400, margin: '3rem auto'}}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form className="module-form" onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button style={{marginTop: '1rem'}} onClick={() => { setIsLogin(l => !l); setError(''); }}>
        {isLogin ? 'Create an account' : 'Back to login'}
      </button>
      {error && <p style={{color: 'red', marginTop: '1rem'}}>{error}</p>}
    </div>
  );
};

export default Auth;

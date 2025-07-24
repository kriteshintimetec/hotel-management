import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const getRooms = async (token) => {
  return axios.get(`${API_URL}/rooms`, { headers: { Authorization: `Bearer ${token}` } });
};

export const addRoom = async (room, token) => {
  return axios.post(`${API_URL}/rooms`, room, { headers: { Authorization: `Bearer ${token}` } });
};

export const getBookings = async (token) => {
  return axios.get(`${API_URL}/bookings`, { headers: { Authorization: `Bearer ${token}` } });
};

export const addBooking = async (booking, token) => {
  return axios.post(`${API_URL}/bookings`, booking, { headers: { Authorization: `Bearer ${token}` } });
};

export const getCustomers = async (token) => {
  return axios.get(`${API_URL}/customers`, { headers: { Authorization: `Bearer ${token}` } });
};

export const addCustomer = async (customer, token) => {
  return axios.post(`${API_URL}/customers`, customer, { headers: { Authorization: `Bearer ${token}` } });
};

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hotel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const JWT_SECRET = 'your_jwt_secret';
// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash });
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Room Schema
const roomSchema = new mongoose.Schema({
  id: Number,
  type: String,
  status: String,
  price: Number,
});
const Room = mongoose.model('Room', roomSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  customer: String,
  room: Number,
  date: String,
  status: String,
});
const Booking = mongoose.model('Booking', bookingSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});
const Customer = mongoose.model('Customer', customerSchema);

// Room routes
app.get('/api/rooms', authMiddleware, async (req, res) => {
  res.json(await Room.find());
});
app.post('/api/rooms', authMiddleware, async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.json(room);
});

// Booking routes
app.get('/api/bookings', authMiddleware, async (req, res) => {
  res.json(await Booking.find());
});
app.post('/api/bookings', authMiddleware, async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json(booking);
});

// Customer routes
app.get('/api/customers', authMiddleware, async (req, res) => {
  res.json(await Customer.find());
});
app.post('/api/customers', authMiddleware, async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});

app.listen(5000, () => {
  console.log('Hotel backend running on http://localhost:5000');
});

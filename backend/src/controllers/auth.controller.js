import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
import { generateToken } from '../utils/jwt.js';

const userRepo = AppDataSource.getRepository(User);

export const signup = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await userRepo.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ username, password: hashedPassword, role });
    await userRepo.save(user);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password,role } = req.body;

  try {
    const user = await userRepo.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const isAuthorized = role === user.role;
    if (!isAuthorized) return res.status(403).json({ message: 'Access denied' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

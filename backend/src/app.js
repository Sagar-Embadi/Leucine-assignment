import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import softwareRoutes from './routes/software.routes.js';
import requestRoutes from './routes/request.routes.js';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL, // replace with your client URL
  credentials: true, // if you are using cookies or auth headers
}));

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

// Protected test route
import { authenticate, authorizeRoles } from './middleware/auth.middleware.js';
app.get('/api/secret', authenticate, authorizeRoles('Admin'), (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, you are an Admin.` });
});

AppDataSource.initialize()
  .then(() => {
    console.log('DB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('DB init error:', err));



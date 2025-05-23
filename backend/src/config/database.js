// require('dotenv').config();
// const { DataSource } = require('typeorm');
// const path = require('path');

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: [path.join(__dirname, '../entities/*.js')],
// });

// module.exports = AppDataSource;

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.js';
import { Software } from '../entities/Software.js';
import { Request } from '../entities/Request.js';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Software, Request],
  logging: false,
  entities: ['src/entities/*.js'],
  ssl: {
    rejectUnauthorized: false, // this allows connecting without strict SSL cert validation
  },
});


// const { EntitySchema } = require('typeorm');
// const { User } = require('./User');
// const { Software } = require('./Software');

// module.exports.Request = new EntitySchema({
//   name: 'Request',
//   tableName: 'requests',
//   columns: {
//     id: {
//       primary: true,
//       type: 'int',
//       generated: true,
//     },
//     accessType: {
//       type: 'enum',
//       enum: ['Read', 'Write', 'Admin'],
//     },
//     reason: {
//       type: 'text',
//     },
//     status: {
//       type: 'enum',
//       enum: ['Pending', 'Approved', 'Rejected'],
//     },
//   },
//   relations: {
//     user: {
//       type: 'many-to-one',
//       target: 'User',
//       eager: true,
//     },
//     software: {
//       type: 'many-to-one',
//       target: 'Software',
//       eager: true,
//     },
//   },
// });


import { EntitySchema } from 'typeorm';
import { User } from './User.js';
import { Software } from './Software.js';

export const Request = new EntitySchema({
  name: 'Request',
  tableName: 'requests',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    status: {
      type: 'enum',
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      eager: true,
    },
    software: {
      type: 'many-to-one',
      target: 'Software',
      eager: true,
    },
  },
});


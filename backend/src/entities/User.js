// const { EntitySchema } = require('typeorm');

// module.exports.User = new EntitySchema({
//   name: 'User',
//   tableName: 'users',
//   columns: {
//     id: {
//       primary: true,
//       type: 'int',
//       generated: true,
//     },
//     username: {
//       type: 'varchar',
//       unique: true,
//     },
//     password: {
//       type: 'varchar',
//     },
//     role: {
//       type: 'enum',
//       enum: ['Employee', 'Manager', 'Admin'],
//     },
//   },
// });

// import { EntitySchema } from 'typeorm';

// export const User = new EntitySchema({
//   name: 'User',
//   tableName: 'users',
//   columns: {
//     id: {
//       primary: true,
//       type: 'int',
//       generated: true,
//     },
//     username: {
//       type: 'varchar',
//       unique: true,
//     },
//     password: {
//       type: 'varchar',
//     },
//     role: {
//       type: 'enum',
//       enum: ['Employee', 'Manager', 'Admin'],
//     },
//   },
// });

import { EntitySchema } from "typeorm";
import { Request } from "./Request.js";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    role: {
      type: "enum",
      enum: ["Employee", "Manager", "Admin"],
    },
  },
  relations: {
    requests: {
      type: "one-to-many",
      target: "Request",
      inverseSide: "user",
      cascade: true,
    },
  },
});

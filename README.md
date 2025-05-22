# 🧭 User Access Management System

This project is a role-based user access management system built with **Node.js**, **Express**, **React**, **TypeORM**, and **PostgreSQL**. It allows employees to request software access, managers to approve or reject requests, and admins to manage software listings.

---

## 🚀 Features

- ✅ User Registration & Login (JWT Authentication)
- ✅ Role-based Access Control (Employee, Manager, Admin)
- ✅ Software Management (Create, List – Admin only)
- ✅ Access Request Submission (Employees)
- ✅ Request Approval/Rejection (Managers)
- ✅ PostgreSQL with TypeORM schema
- ✅ Password encryption with bcrypt
- ✅ API documentation and setup instructions

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Others**: bcrypt, dotenv, nodemon

---

## 📁 Project Structure

    root/
    │
    ├── backend/
    │ ├── src/
    │ │ ├── controllers/
    │ │ ├── entities/
    │ │ ├── middleware/
    │ │ ├── routes/
    │ │ ├── utils/
    │ │ └── index.ts
    │ └── .env
    │
    ├── frontend/
    │ ├── public/
    │ └── src/
    │ ├── pages/
    │ ├── components/
    │ ├── services/
    │ └── App.tsx
    │
    ├── README.md
    └── package.json


---

## 🧑‍💻 User Roles

| Role     | Capabilities |
|----------|--------------|
| Employee | Sign up, log in, request software access |
| Manager  | Approve or reject access requests |
| Admin    | Full access, including software creation |

---

## 🧩 API Endpoints

### 🧾 Auth

- `POST /api/auth/signup` – Register as Employee by default  
- `POST /api/auth/login` – Login and receive JWT token

### 🧾 Software (Admin Only)

- `POST /api/software` – Create new software  
  **Fields:** `name`, `description`, `accessLevels[]`

### 🧾 Access Request (Employee)

- `POST /api/requests` – Submit new access request  
  **Fields:** `softwareId`, `accessType`, `reason`

### 🧾 Request Approval (Manager)

- `PATCH /api/requests/:id` – Approve or reject a request  
  **Field:** `status` (Approved/Rejected)

---

## 🧬 Database Schema (TypeORM Entities)

### 🧍 User

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: 'Employee' | 'Manager' | 'Admin';
}

### 💾 Software

@Entity()
class Software {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column("simple-array")
  accessLevels: string[]; // e.g., ["Read", "Write", "Admin"]
}

### 📝 Request

@Entity()
class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Software)
  software: Software;

  @Column()
  accessType: 'Read' | 'Write' | 'Admin';

  @Column('text')
  reason: string;

  @Column()
  status: 'Pending' | 'Approved' | 'Rejected';
}

## 🧪 Setup Instructions

1. Clone the repository

    git clone `https://github.com/sagar-embadi/leucine-assignment`
    cd leucine-assignment

2. Backend Setup

    cd backend
    cp .env.example .env

# Fill in DB credentials and JWT_SECRET

    npm install
    npm run dev

3. Frontend Setup

    cd frontend
    npm install
    npm run dev

## 🛡️ Security Features

 - Passwords encrypted using bcrypt
 - JWT authentication with expiry
 - Role-based access middleware
 - Protected routes for Admin and Manager roles

## ✅ Functionality

 - Sign-Up / Login
 - JWT Auth & Middleware
 - Role-based UI Redirection
 - Software Management (Admin)	
 - Access Request (Employee)	
 - Approval Interface (Manager)	
 - PostgreSQL Schema Integration	
 - Documentation and Setup Scripts	

## 📬 Contact

For any queries or suggestions, feel free to contact:

Sagar Embadi
Email: sagarembadi7@gmail.com
GitHub: https://github.com/sagar-embadi


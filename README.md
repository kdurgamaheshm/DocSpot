# 🩺 DocSpot – Role-Based Doctor Appointment Booking System

**DocSpot** is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to manage healthcare appointment scheduling. It supports role-based access for **Patients**, **Doctors**, and **Admins** with real-time availability, secure document handling, and smart dashboards.

---

## 🚀 Features

### 👤 Patients
- Register/login securely
- Search doctors by specialty, location & real-time availability
- Book/reschedule/cancel appointments
- Upload medical documents
- Get SMS/email notifications

### 🩺 Doctors
- Manage appointment slots & profile
- View/confirm/reject appointments
- Access patient records
- Add notes and follow-up recommendations

### 🛡️ Admins
- Approve/reject doctors
- Monitor platform activity
- View real-time analytics:
  - Appointment stats (daily/weekly/monthly)
  - Doctor/patient counts
  - Popular specialties & peak hours

---

## 📚 Tech Stack

| Layer      | Technologies                          |
|------------|---------------------------------------|
| Frontend   | React.js, Ant Design, Bootstrap       |
| Backend    | Node.js, Express.js                   |
| Database   | MongoDB, Mongoose                     |
| Auth       | JWT, bcrypt                           |
| Tools      | Moment.js, Multer, CORS, Nodemon      |

---

## 📁 Project Structure

Doc_Spot/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
├── README.md

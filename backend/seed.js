const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const seedUsers = [
  {
    username: 'adminuser',
    email: 'admin@docspot.com',
    password: 'admin123',
    role: 'Admin',
  },
  {
    username: 'drsmith',
    email: 'doctor@docspot.com',
    password: 'doctor123',
    role: 'Doctor',
  },
  {
    username: 'johndoe',
    email: 'user@docspot.com',
    password: 'user123',
    role: 'User',
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    console.log('Existing users removed');

    for (const userData of seedUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      });
      await user.save();
      console.log(`User ${user.username} created`);
    }

    console.log('Seeding complete');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

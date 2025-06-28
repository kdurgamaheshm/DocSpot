import React, { useState } from 'react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    alert('Password changed successfully.');
    // Add API integration here for password change
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Change Password</h1>
      <form onSubmit={handleSubmit} className="max-h-screen space-y-4 ">
        <div>
          <label className="block mb-1 font-semibold text-black">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 text-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-black" >New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 text-black"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-black">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

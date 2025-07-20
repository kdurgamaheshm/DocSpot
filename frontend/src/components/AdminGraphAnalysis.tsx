
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useGetAllUsersQuery } from "../redux/api/userSlice";
import { useGetAllDoctorsQuery } from "../redux/api/doctorSlice";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface User {
  _id: string;
  name: string;
  isDoctor: boolean;
  isAdmin: boolean;
  // add other user fields as needed
}

interface Doctor {
  _id: string;
  userId: string;
  specialization: string;
  // add other doctor fields as needed
}

const AdminGraphAnalysis: React.FC = () => {
  const { data: usersData, isLoading: usersLoading, error: usersError } = useGetAllUsersQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } = useGetAllDoctorsQuery(undefined, { refetchOnMountOrArgChange: true });

  if (usersLoading || doctorsLoading) {
    return <div>Loading analytics...</div>;
  }

  if (usersError || doctorsError) {
    return <div>Error loading analytics data.</div>;
  }

  const users: User[] = usersData?.data || [];
  const doctors: Doctor[] = doctorsData?.data || [];

  // Compute total users and total doctors
  const totalUsers = users.length;
  const totalDoctors = doctors.length;

  // Example: Count users by role
  const adminCount = users.filter((user) => user.isAdmin).length;
  const doctorCount = users.filter((user) => user.isDoctor).length;
  const regularUserCount = totalUsers - adminCount - doctorCount;

  // Example: Prepare data for Pie chart showing user roles
  const userRolePieData = [
    { name: "Admins", value: adminCount },
    { name: "Doctors", value: doctorCount },
    { name: "Users", value: regularUserCount },
  ];

  // Example: Prepare data for Bar chart showing doctors by specialization
  const specializationCounts: { [key: string]: number } = {};
  doctors.forEach((doctor) => {
    const spec = doctor.specialization || "Unknown";
    specializationCounts[spec] = (specializationCounts[spec] || 0) + 1;
  });

  const doctorSpecializationData = Object.entries(specializationCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div style={{ width: "100%", height: 400, marginTop: 20 }}>
      <h2>User Roles Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={userRolePieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props: { name?: string; percent?: number }) => {
              const { name, percent } = props;
              return `${name}: ${(percent ?? 0) * 100}%`;
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {userRolePieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h2 className="mt-4">Doctors by Specialization</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={doctorSpecializationData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminGraphAnalysis;

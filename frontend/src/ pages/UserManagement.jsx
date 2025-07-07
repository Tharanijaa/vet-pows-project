import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No authentication token found. Please log in.');
      setUsers([]);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data); // ✅ Fetch all users
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Failed to fetch users.');
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    alert(`👁 Viewing user:\n\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUsers();
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <p className="text-sm text-gray-500">Admin can view and delete all users</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">All Users ({users.length})</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading users...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No users found.</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-left">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 text-gray-600">
                        <Eye className="w-4 h-4 cursor-pointer hover:text-black" onClick={() => handleView(user)} />
                        <Trash2
                          className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(user._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TriangleAlert } from 'lucide-react';
import { useAuth } from "../../../contexts/AuthContext";

const AdminHub = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userToChangeRole, setUserToChangeRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/all-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        const sortedUsers = data.users.sort((a, b) => b.numberReports - a.numberReports);
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/delete/${userToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user._id !== userToDelete));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message);
    }
  };

  const handleRoleChange = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/change-role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: userToChangeRole,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change role");
      }

      setUsers(users.map(user => 
        user._id === userToChangeRole 
          ? { ...user, role: selectedRole }
          : user
      ));
      setShowRoleModal(false);
    } catch (error) {
      console.error("Error changing role:", error);
      setError(error.message);
    }
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-start w-full bg-gray-100 px-20 py-10">
      <div className="flex flex-row items-center justify-between w-full mb-6">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold">User Management</h1>
          <div className="flex items-center space-x-2 text-gray-500">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-blue-500">Admin Hub</span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <input
            type="text"
            placeholder="Search User"
            className="w-80 p-2 border border-gray-300 rounded-md"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      <div className="w-full bg-white shadow-md rounded-lg">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">User Role</th>
              <th className="p-4">Actions</th>
              <th className="p-4">Reports</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300">
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <Link 
                        to={`/check-post/${user._id}`} 
                        className="font-bold hover:text-blue-500"
                      >
                        {user.username}
                      </Link>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        user.role === "Admin"
                          ? "bg-blue-100 text-blue-800"
                          : user.role === "PremiumUser"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  {!user.isVerified && (
                    <p className="text-xs text-red-500 mt-2">Not Verified</p>
                  )}
                </td>
                <td className="p-4 space-x-2">
                  <button 
                    onClick={() => {
                      setUserToChangeRole(user._id);
                      setSelectedRole(user.role);
                      setShowRoleModal(true);
                    }}
                    className="bg-gray-200 text-gray-800 py-1 px-3 rounded hover:bg-gray-300"
                    style={{ visibility: currentUser._id === user._id ? 'hidden' : 'visible' }}
                  >
                    Modify Role
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Remove User
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${
                      user.numberReports > 9 ? 'text-red-500' : 'text-gray-600'
                    }`}>
                      {user.numberReports || 0}
                    </span>
                    {user.numberReports > 9 && (
                      <TriangleAlert size={20} color="#ef4444" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Change User Role</h3>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="PremiumUser">Premium User</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHub;
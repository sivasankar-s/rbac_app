import React, { useState, useEffect } from "react";
import UserRecord from "../components/UserRecord";
import AddUserModal from "../components/AddUserModal";

const ManageUsers = () => {
  let [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((json) => setUsers(json.users));
  }, []);

  const handleAddUser = async (userData) => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    setUsers([...users, data.user]);
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = confirm("Do you want to remove this user? ");

    if (confirmDelete) {
      try {
        await fetch(`/api/users/${id}`, { method: "DELETE" });
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEditUser = async (userr) => {
    try {
      const res = await fetch(`/api/users/${userr.id}`, {
        method: "PATCH",
        body: JSON.stringify(userr),
      });
      const json = await res.json();
      const userscopy = [...users];
      const index = users.findIndex((u) => u.id === userr.id);
      userscopy[index] = json.user;
      setUsers(userscopy);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-5">Manage Users</h1>

      <div className="flex justify-end p-2 mb-3">
        <button
          onClick={() => setAddUserModalOpen(true)}
          className="bg-dark-2 text-white font-semibold p-1 px-2 md:p-2 md:px-4 rounded-md transition-all hover:bg-dark-1"
        >
          {" "}
          + Add User
        </button>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <div className="grid gap-3">
        <div className="grid grid-cols-4 lg:grid-cols-5 text-gray-600 p-2">
          <p className="p-2 flex justify-center">Name</p>
          <p className="hidden lg:flex p-2 lg:justify-center">Email</p>
          <p className="p-2 flex justify-center">Status</p>
          <p className="p-2 flex justify-center">Role</p>
          <p className="p-2 flex justify-center">Actions</p>
        </div>
        {users.map((user, index) => (
          <UserRecord
            key={index}
            handleDeleteUser={handleDeleteUser}
            handleEditUser={handleEditUser}
            name={user.name}
            id={user.id}
            status={user.status}
            email={user.email}
            role={user.role}
          />
        ))}
      </div>
    </>
  );
};

export default ManageUsers;

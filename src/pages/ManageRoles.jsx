import React, { useState, useEffect } from "react";
import RoleRecord from "../components/RoleRecord";
import AddRoleModal from "../components/AddRoleModal";

const ManageRoles = () => {
  let [roles, setRoles] = useState([]);
  const [isAddRoleModalOpen, setAddRoleModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/roles")
      .then((response) => response.json())
      .then((json) => setRoles(json.roles));
  }, []);

  const handleAddRole = async (roleData) => {
    const res = await fetch("/api/roles", {
      method: "POST",
      body: JSON.stringify(roleData),
    });
    const data = await res.json();
    setRoles([...roles, data.role]);
  };

  const handleDeleteRole = async (id) => {
    const confirmDelete = confirm("Do you want to remove this role? ");

    if (confirmDelete) {
      try {
        await fetch(`/api/roles/${id}`, { method: "DELETE" });
        setRoles(roles.filter((role) => role.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEditRole = async (rolee) => {
    try {
      const res = await fetch(`/api/roles/${rolee.id}`, {
        method: "PATCH",
        body: JSON.stringify(rolee),
      });
      const json = await res.json();
      const rolescopy = [...roles];
      const index = roles.findIndex((r) => r.id === rolee.id);
      rolescopy[index] = json.role;
      setRoles(rolescopy);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Manage Roles</h1>

      <div className="flex justify-end p-2 mb-3">
        <button
          onClick={() => setAddRoleModalOpen(true)}
          className="bg-dark-2 text-white font-semibold p-1 px-2 md:p-2 md:px-4 rounded-md transition-all hover:bg-dark-1"
        >
          {" "}
          + Add Role
        </button>
      </div>

      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onClose={() => setAddRoleModalOpen(false)}
        onSubmit={handleAddRole}
      />

      <div className="grid gap-3">
        <div className="grid grid-cols-3 p-2 text-gray-600">
          <p className="p-2 flex justify-center">Role</p>
          <p className="p-2 flex justify-center">Permissions</p>
          <p className="p-2 flex justify-center">Actions</p>
        </div>
        {roles.map((role, index) => (
          <RoleRecord
            key={index}
            handleDeleteRole={handleDeleteRole}
            handleEditRole={handleEditRole}
            id={role.id}
            name={role.name}
            permissions={role.permissions}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageRoles;

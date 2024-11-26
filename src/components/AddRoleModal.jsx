import React, { useState } from 'react';

const AddRoleModal = ({ isOpen, onClose, onSubmit }) => {
  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]); // Empty initially

  const allPermissions = ['read', 'write', 'edit', 'delete', 'share']; // Example permissions

  // Toggle permissions
  const handleCheckboxChange = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission) // Remove if already selected
        : [...prev, permission] // Add if not selected
    );
  };

  const resetForm = () => {
    setRoleName('');
    setSelectedPermissions([]);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (roleName.trim() === '') {
      alert('Please enter a role name');
      return;
    }
    onSubmit({ roleName, permissions: selectedPermissions });
    resetForm(); // Reset the form after submission
    onClose(); // Close the modal after submission
  };

  const handleCancel = () => {
    resetForm(); // Reset the form on cancel
    onClose(); // Close the modal on
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 m-6">
        <h2 className="text-xl font-semibold mb-4">Add New Role</h2>

        {/* Role Name Input */}
        <div className="mb-4">
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full mt-1 p-2 border-b-2 transition-colors focus:border-black focus:outline-none"
            placeholder="Enter role name"
          />
        </div>

        {/* Permissions Checkboxes */}
        <div className="text-lg font-semibold mb-4 mt-3">Permissions</div>
        <div className="space-y-3 max-h-48 overflow-y-auto border p-2 rounded-md transition-all">
          {allPermissions.map((permission) => (
            <label key={permission} className="flex items-center space-x-3">
              <input
                type="checkbox"
                value={permission}
                checked={selectedPermissions.includes(permission)}
                onChange={() => handleCheckboxChange(permission)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700 capitalize">{permission}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-dark-2 text-white px-4 py-2 rounded-md hover:bg-dark-1 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;

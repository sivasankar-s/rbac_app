import React, { useState, useEffect } from 'react';

const CheckboxForm = ({ isOpen, onClose, onSubmit, role }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]); // State to store selected permissions

  const allPermissions = ['read', 'write', 'edit', 'delete', 'share']; // Full list of permissions

  // Load initial permissions when the modal opens or initialPermissions changes
  useEffect(() => {
    if (isOpen) {
      setSelectedPermissions(role.permissions || []);
    }
  }, [isOpen, role.permissions]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission) // Remove if already selected
        : [...prev, permission] // Add if not selected
    );
  };

  // Function to handle form submission
  const handleSubmit = () => {
    onSubmit(selectedPermissions); // Pass selected permissions to parent
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 m-6">

        <h2 className="text-xl font-semibold mb-4">Edit Role</h2>
        {/* Role Name Input */}
        <div className="mb-4">
          <input
            type="text"
            value={role.name}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full mt-1 p-2 border-b-2 transition-colors focus:border-black focus:outline-none"
            placeholder="Enter role name"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Edit Permissions</h2>
        <div className="space-y-3 max-h-48 overflow-y-auto border p-2 transition-all rounded-md">
          {/* Render Checkboxes */}
          {allPermissions.map((permission) => (
            <label key={permission} className="flex items-center space-x-3">
              <input
                type="checkbox"
                value={permission}
                checked={selectedPermissions.includes(permission)} // Show as checked if in selectedPermissions
                onChange={() => handleCheckboxChange(permission)} // Toggle selection
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">
                {permission.charAt(0).toUpperCase() + permission.slice(1)}
              </span>
            </label>
          ))}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
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

export default CheckboxForm;

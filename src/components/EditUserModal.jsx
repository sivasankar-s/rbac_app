import React, { useState, useEffect } from "react";

const EditUserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isActive, setIsActive] = useState(user.status);
  const [role, setRole] = useState(user.role); 


  // Get the list of roles from the server
  let [roles, setRoles] = useState([]);
  useEffect(() => {
    fetch("/api/roles")
      .then((response) => response.json())
      .then((json) => {
        setRoles(json.roles)
        console.log(role)
      }
      );
      const userData = { name, email, status: isActive, role, id: user.id };
      console.log(role)
  }, []);

  const handleSubmit = () => {
    const userData = { name, email, status: isActive, role, id: user.id };
    if (validateUser(userData)) {
      onSubmit(userData); // Pass user data to the parent component
      onClose(); // Close the modal after submission
    }
  };

  const validateUser = (userData) => {
    // Add validation logic here
    if (name === "") {
      alert("Please enter Name");
      return false;
    } else if (email === "") {
      alert("Please enter Email");
      return false;
    } else if (email.includes("@") === false) {
      alert("Please enter a valid Email");
      return false;
    } else if (role == "") {
      alert("Please select a Role");
      return false;
    }
    return true;
  };

  // Close the modal and reset the form on cancel
  const handleCancel = () => {
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 m-6">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <input
              type="text"
              className="w-full mt-1 p-2 border-b-2 transition-colors focus:border-b-black focus:outline-none focus:border-b-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          {/* Email Input */}
          <div>
            <input
              type="email"
              className="w-full mt-1 p-2 border-b-2 transition-colors focus:border-b-black focus:outline-none focus:border-b-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          {/* Active/Inactive Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`w-14 h-6 rounded-full ${
                isActive ? "bg-green-500" : "bg-gray-300"
              } relative focus:outline-none`}
            >
              <div
                className={`w-5 h-5  bg-white rounded-full shadow-md  transition-transform ${
                  isActive ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span className="ml-3 text-sm">
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
          {/* Role Listbox */}
          <div>
            <select
              value={role}
              
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-2 border transition-all rounded-md focus:outline-none"
            >
              {/* <option value="" disabled selected>Select Role</option> */}
              {roles.map(({ name: r }) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
              {console.log(role)}
            </select>
          </div>

          <div className="flex justify-end gap-3">
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
    </div>
  );
};

export default EditUserModal;

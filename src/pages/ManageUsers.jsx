import React, { useState, useEffect } from 'react'
import UserRecord from '../components/UserRecord'
import { createServer } from "miragejs"
import AddUserModal from '../components/AddUserModal'

createServer({
  routes() {
    this.get("/api/users", () => [
      {name: 'Siva', email: 'siva@gmail.com', status: true, role: 'admin'},
        {name: 'John', email: 'john@gmail.com', status: false, role: 'user'},
        {name: 'Ram', email: 'ram@gmail.com', status: true, role: 'user'},
        {name: 'Raj', email: 'raj@gmail.com', status: false, role: 'admin'},
        {name: 'Ravi', email: 'ravi@gmail.com', status: true, role: 'user'},
    ]),
    this.get("/api/roles", () => [
      {name: 'Admin', permissions:['read', 'write', 'delete','edit','share']},
      {name: 'User', permissions:['read','share']},
      {name: 'Editor', permissions:['edit','share']},
      {name: 'Author', permissions:['read', 'write', 'delete','edit']},
    ])
  },
})



const ManageUsers = () => {

  let [users, setUsers] = useState([])
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))

    console.log(users)
  }, [])

  const handleAddUser = (userData) => {
    console.log('User Data:', userData); // Handle the user data - API call
  };



  return (
    <>
    {/* <p>{users}</p> */}
    <h1 className='text-2xl font-semibold mb-5'>Manage Users</h1>

    <div className='flex justify-end p-2 mb-3'>
      <button onClick={() => setAddUserModalOpen(true)}
      className='bg-dark-2 text-white font-semibold p-1 px-2 md:p-2 md:px-4 rounded-md transition-all hover:bg-dark-1'> + Add User</button>
    </div>

    <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        onSubmit={handleAddUser}
      />

    <div className='grid gap-3' >
      <div className='grid grid-cols-4 lg:grid-cols-5 text-gray-600 p-2'>
      <p className='p-2 flex justify-center'>Name</p>
      <p className='hidden lg:flex p-2 lg:justify-center'>Email</p>
      <p className='p-2 flex justify-center'>Status</p>
      <p className='p-2 flex justify-center'>Role</p>
      <p className='p-2 flex justify-center'>Actions</p>
      </div>
      {users.map((user, index) => (
        <UserRecord key={index} name={user.name} status={user.status} email={user.email} role={user.role} />
      ))  
      }
      </div>
    </>
  )
}

export default ManageUsers
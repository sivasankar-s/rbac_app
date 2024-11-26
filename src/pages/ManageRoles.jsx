import React, {useState, useEffect} from 'react'
import { createServer } from "miragejs"
import RoleRecord from '../components/RoleRecord'
import AddRoleModal from '../components/AddRoleModal'


// createServer({
//   routes() {
//     this.get("/api/roles", () => [
//       {name: 'Admin', permissions:['read', 'write', 'delete','edit','share']},
//       {name: 'User', permissions:['read','share']},
//       {name: 'Editor', permissions:['edit','share']},
//       {name: 'Author', permissions:['read', 'write', 'delete','edit']},
//     ]),
//     this.get("/api/users", () => [
//       {name: 'Siva', email: 'siva@gmail.com', status: true, role: 'admin'},
//         {name: 'John', email: 'john@gmail.com', status: false, role: 'user'},
//         {name: 'Ram', email: 'ram@gmail.com', status: true, role: 'user'},
//         {name: 'Raj', email: 'raj@gmail.com', status: false, role: 'admin'},
//         {name: 'Ravi', email: 'ravi@gmail.com', status: true, role: 'user'},
//     ])
//   },
// })

const ManageRoles = () => {

  let [roles, setRoles] = useState([])
  const [isAddRoleModalOpen, setAddRoleModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/roles")
      .then((response) => response.json())
      .then((json) => setRoles(json.roles))

    console.log(roles)
  }, [])

  const handleAddRole = async (roleData) => {
    console.log('User Data:', roleData); // Handle the user data - API call
    const res = await fetch('/api/roles', {method: 'POST', body: JSON.stringify(roleData)})
    const data = await res.json()
    console.log('Data:', data); 
    setRoles([...roles, data.role])
  };

  const handleDeleteRole = async (id) => {
    const confirmDelete = confirm("Do you want to remove this role? ")
    
    if(confirmDelete){
      // API call to delete the role
      try{
       await fetch(`/api/roles/${id}`, {method: 'DELETE'})
       setRoles(roles.filter(role => role.id !== id))
       console.log(id)
       
      } catch(err) {
       console.log(err)
      }
    }
   //  console.log('User Data:', userData);
 };

 const handleEditRole = async (rolee) => {
  // const confirmDelete = confirm("Do you want to remove this user? ")
  
  // if(confirmDelete){
    // API call to delete the user
    try{
     const res = await fetch(`/api/roles/${rolee.id}`, {method: 'PATCH',body: JSON.stringify(rolee)})
      const json = await res.json()
      
     const rolescopy = [...roles]
     console.log(rolee.id)
     const index = roles.findIndex(r => r.id === rolee.id)
     console.log(json)
     rolescopy[index] = json.role
     setRoles(rolescopy)
    //  console.log(id)
     console.log(rolescopy)
     console.log(index)
     
    } catch(err) {
     console.log(err)
    }
  // }
 //  console.log('User Data:', userData);
};

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-5'>Manage Roles</h1>

<div className='flex justify-end p-2 mb-3'>
  <button onClick={() => setAddRoleModalOpen(true)}
  className='bg-dark-2 text-white font-semibold p-1 px-2 md:p-2 md:px-4 rounded-md transition-all hover:bg-dark-1'> + Add Role</button>
</div>

<AddRoleModal
    isOpen={isAddRoleModalOpen}
    onClose={() => setAddRoleModalOpen(false)}
    onSubmit={handleAddRole}
  />

<div className='grid gap-3' >
  <div className='grid grid-cols-3 p-2 text-gray-600'>
  <p className='p-2 flex justify-center'>Role</p>
  <p className='p-2 flex justify-center'>Permissions</p>
  <p className='p-2 flex justify-center'>Actions</p>
  </div>
  {roles.map((role, index) => (
    <RoleRecord key={index} handleDeleteRole={handleDeleteRole} handleEditRole={handleEditRole}  id={role.id} name={role.name} permissions={role.permissions} />
  ))  
  }
  </div>
    </div>
  )
}

export default ManageRoles
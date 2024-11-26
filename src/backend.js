import { createServer } from "miragejs"

server = createServer({
    routes() {
        
        this.get('/api/users', (schema) => {
            return schema.db().users.all()
        })
    }
})

server.db().loadData({
    users: [
        {name: 'Siva', email: 'siva@gmail.com', status: 'Active', role: 'Admin'},
        {name: 'John', email: 'john@gmail.com', status: 'Inactive', role: 'User'},
        {name: 'Ram', email: 'ram@gmail.com', status: 'Active', role: 'User'},
        {name: 'Raj', email: 'raj@gmail.com', status: 'Inactive', role: 'Admin'},
        {name: 'Ravi', email: 'ravi@gmail.com', status: 'Active', role: 'User'},
    ]
})



export default server
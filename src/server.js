import { createServer, Model } from "miragejs"

// let users = [
//     {name: 'Siva', email: 'siva@gmail.com', status: true, role: 'admin'},
//     {name: 'John', email: 'john@gmail.com', status: false, role: 'user'},
//     {name: 'Ram', email: 'ram@gmail.com', status: true, role: 'user'},
//     {name: 'Raj', email: 'raj@gmail.com', status: false, role: 'admin'},
//     {name: 'Ravi', email: 'ravi@gmail.com', status: true, role: 'user'},
// ]

// let roles = [
//     {name: 'Admin', permissions:['read', 'write', 'delete','edit','share']},
//     {name: 'User', permissions:['read','share']},
//     {name: 'Editor', permissions:['edit','share']},
//     {name: 'Author', permissions:['read', 'write', 'delete','edit']},
// ]

createServer({
    models: {
        user: Model,
        role: Model
    },

    seeds(server){
        server.create('user', {id:1, name: 'Siva', email: 'siva@gmail.com', status: true, role: 'admin'})
        server.create('user', {id:2, name: 'John', email: 'john@gmail.com', status: false, role: 'user'})
        server.create('user', {id:3, name: 'Ram', email: 'ram@gmail.com', status: true, role: 'user'})
        server.create('user', {id:4, name: 'Raj', email: 'raj@gmail.com', status: false, role: 'admin'})
        server.create('user', {id:5, name: 'Ravi', email: 'ravi@gmail.com', status: true, role: 'user'})

        server.create('role', {id:1, name: 'Admin', permissions:['read', 'write', 'delete','edit','share']})
        server.create('role', {id:2, name: 'User', permissions:['read','share']})
        server.create('role', {id:3, name: 'Editor', permissions:['edit','share']})
        server.create('role', {id:4, name: 'Author', permissions:['read', 'write', 'delete','edit']})
    },


  routes() {
    this.namespace = "api"

    this.get("/users", (schema, request) => {
      return schema.users.all()
    })

    this.get("/roles", (schema, request) => {
        return schema.roles.all()
      })

    this.post("/users", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        
        return schema.users.create(attrs)
    })

    this.patch("/users/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody)
        let id = request.params.id
        console.log(id)
        let user = schema.users.find(id)
        console.log(user)
      
        return user.update(newAttrs)
      })
      
      this.delete("/users/:id", (schema, request) => {
        let id = request.params.id
      
        return schema.users.find(id).destroy()
      })
  },
})
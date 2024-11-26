import { createServer, Model } from "miragejs";

createServer({
  models: {
    user: Model,
    role: Model,
  },

  seeds(server) {
    // Initial data
    server.create("user", {
      id: 1,
      name: "Siva",
      email: "siva@gmail.com",
      status: true,
      role: "Admin",
    })
    server.create("user", {
      id: 2,
      name: "John",
      email: "john@gmail.com",
      status: false,
      role: "User",
    });
    server.create("user", {
      id: 3,
      name: "Ram",
      email: "ram@gmail.com",
      status: true,
      role: "User",
    });
    server.create("user", {
      id: 4,
      name: "Raj",
      email: "raj@gmail.com",
      status: false,
      role: "Admin",
    });
    server.create("user", {
      id: 5,
      name: "Ravi",
      email: "ravi@gmail.com",
      status: true,
      role: "User",
    });

    server.create("role", {
      id: 1,
      name: "Admin",
      permissions: ["read", "write", "delete", "edit", "share"],
    });
    server.create("role", {
      id: 2,
      name: "User",
      permissions: ["read", "share"],
    });
    server.create("role", {
      id: 3,
      name: "Editor",
      permissions: ["edit", "share"],
    });
    server.create("role", {
      id: 4,
      name: "Author",
      permissions: ["read", "write", "delete", "edit"],
    });
  },

  routes() {
    this.namespace = "api";

    // get all users
    this.get("/users", (schema, request) => {
      return schema.users.all();
    });

    // get all roles
    this.get("/roles", (schema, request) => {
      return schema.roles.all();
    });

    // create a new user
    this.post("/users", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);

      return schema.users.create(attrs);
    });

    // update a user
    this.patch("/users/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      console.log(id);
      let user = schema.users.find(id);
      console.log(user);

      return user.update(newAttrs);
    });

    // delete a user
    this.delete("/users/:id", (schema, request) => {
      let id = request.params.id;

      return schema.users.find(id).destroy();
    });

    // create a new role
    this.post("/roles", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);

      return schema.roles.create(attrs);
    });

    // update a role
    this.patch("/roles/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      console.log(id);
      let role = schema.roles.find(id);
      console.log(role);

      return role.update(newAttrs);
    });

    // delete a role
    this.delete("/roles/:id", (schema, request) => {
      let id = request.params.id;

      return schema.roles.find(id).destroy();
    });
  },
});

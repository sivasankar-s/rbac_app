# RBAC Admin Dashboard



## Project Overview
This is an Admin Dashboard for administrators to manage users and assign roles and modify permissions to roles. In this project we used **React with Vite**. And used **Tailwind CSS** for styling. We used **Mirage.js** for simulating API calls. And the project is deployed in Vercel. The routing functionality was implemented using `react-router-dom`


## Setup

Clone the github repo and type, `npm i` to install the dependecies.

After installing the dependencies, run `npm run dev` to run the project


## Features

### User Management
It provides a clean interface to manage users. We can add new user, assign roles to each user while creating, we can also edit the user. We can also manage the status of each user (Active/Inactive). Input validation also done for robustness.

### Role Management
Roles can be managed here. We can create new roles and assign them users. We can also modify the roles, and delete them. Each role has its permissions clearly displayed in the UI. The roles are updated **dynamically** and can be used to assign the users.

### Custom API Simulation
**Mirage.js** is used to Mock API calls and simulate all functionalities. We can easily replace them in production environment to connect with actual backend. Without a backend, it performs very well (for testing) with the help of Mirage.js. Mirage.js is a tool which makes us able to mock API calls, like integrating with an actual database. 

## How to use
Just visit the URL and you can use. The User Interface is very intuitive for everyone.

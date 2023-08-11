## MERN Web Dashboard for Manufacturer and Transporter Communication

This is a web dashboard project built using the MERN (MongoDB, Express, React, Node.js) tech stack. The dashboard facilitates communication between two user roles: Manufacturer and Transporter. Users can register, log in, and interact with each other through messages and orders.

## Features

- Login and Registration
- Users can register as either a Manufacturer or a Transporter.
- User authentication and authorization are implemented using JWT (JSON Web Tokens).
- Landing Page
- Separate landing pages are provided for Manufacturers and Transporters.
- orders received by each user are displayed on the landing page.
- Users can click on an order ID to view the order content.
- Users can click on the send button and send messages in real time
- Search functionality is available to filter messages based on order ID, "To" field, and "From" field.

## Manufacturer Input Form

Manufacturers can create new orders using an input form with the following fields:

- Order ID: Auto-populated unique code .
- From: Source of the pickup.
- To: Destination of goods.
- Quantity: Drop-down menu for selecting 1, 2, or 3 tons.
- Pickup Address: Auto-populated from manufacturer's registration.
- Transporter: Drop-down menu to select a single transporter.
- After completing the form, manufacturers can submit the request, which will be sent to the chosen transporter.

## Transporter Interaction

Transporters can interact with orders through the following actions:

- View a list of order IDs received from Manufacturers.
- Send message to the manufacturer in real time.
- Use the "send message" button to send messages back to the Manufacturer.
- Real-time Communication
- Socket.io is used to implement real-time communication between Manufacturers and Transporters. Messages and updates are instantly sent and received through the chat feature.

## Installation and Usage

- Clone this repository.
- Navigate to the project directory using the terminal.
- Install server dependencies: npm install
- Navigate to the client directory: cd client
- Install client dependencies: npm install
- Start the server: npm start (from the root directory)
- Start the client: npm start (from the client directory)
- Build the project : npm run build (from the client directory)
- Make sure you have MongoDB set up and running on your local machine.

## Technologies Used

- MongoDB: Database for storing user data and messages.
- Express.js: Backend framework for handling routes and requests.
- React: Frontend library for building user interfaces.
- Node.js: JavaScript runtime for server-side operations.
- Socket.io: Real-time communication library for implementing chat features.
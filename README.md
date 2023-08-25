# Calculator API with History
This is a simple calculator API built using Node.js and Express. It can perform calculations and maintains a history of the last 20 operations.

# Installation
Clone the repository.

Run npm install to install the required dependencies.

Usage

Run the server using npm start.

# Access the API endpoints:

/history: Get a list of the last 20 operations and their answers.

/calculate: Perform a calculation using the query parameter "operation" (e.g., /calculate?operation=5/plus/8).

Features

/history Endpoint: Access the last 20 operations and their answers.

/calculate Endpoint: Perform calculations using query parameters.

History Persistence: The history is stored in a JSON file (history.json) and persists even after server restarts.

Maximum History: The history is limited to the last 20 operations.

# Note
Make sure to have Node.js and npm installed on your machine.

# License
This project is licensed under the MIT License.

## Employee & Branch API

# Project overview
This Employee & Branch api is a backend service which is designed to manage the employee and branch information efficiently.This service allow to :
Employee: Create, update, get all, get by id,delete, get employee by department and get employee by branch from the record.
Branch: Create, delete, update and get branch operations.
This service helps to manage the employees and branch data of any organization in a efficient manner.

# Installation Instructions
Here are the step by step instructions to setup this project:
1: Clone the repository on your local machine by using git clone <link of the repository>

2: Install all the dependencies: npm install

3: Set up the environment variables to protect the sensitive information from git tracking- create a .env file at root of your project defined the required variables. For example
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID= "your_id"
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL="your_client_email"
SWAGGER_SERVER_URL="swagger_server_url"
**Dont forget to .gitignore the .env file.

4:Start server by using npm start command.

5: When the server starts, you can access the endpoints at: 
For employee: http://localhost:3000/api/vi/employee
For branch: http://localhost:3000/api/vi/branch
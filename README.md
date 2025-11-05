## Employee & Branch API
# Project Overview

This Employee & Branch API is a backend service which is designed to manage the employee and branch information efficiently. This service allows to:

Employee:
Create, update, get all, get by ID, delete
Get employee by department
Get employee by branch

Branch:
Create, delete, update
Get branch operations

This service helps to manage the employees and branch data of any organization in an efficient manner.

# Installation Instructions

Here are the step by step instructions to setup this project:

1:Clone the repository on your local machine:
git clone <link of the repository>

2:Install all the dependencies:
npm install

3: Set up the environment variables to protect sensitive information:
Create a .env file at the root of your project and define the required variables. Example:

NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID="your_id"
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL="your_client_email"
SWAGGER_SERVER_URL="swagger_server_url"

Don't forget to add .env to .gitignore.

4:Start the server:
 npm start

5:Access the endpoints when the server starts:

Employee: http://localhost:3000/api/v1/employee

Branch: http://localhost:3000/api/v1/branch

# API Request Examples
Example 1: GET employee
curl --location --request GET 'http://localhost:3000/api/v1/employee/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Harman Kaur",
  "position": "Student",
  "department": "IT",
  "email": "harman.kaur@gmail.com",
  "phone": "2045884571",
  "branchId": 1
}'

Example 2: POST employee
curl --location 'http://localhost:3000/api/v1/employee/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Harman Kaur",
  "position": "Student",
  "department": "IT",
  "email": "harman.kaur@gmail.com",
  "phone": "204-588-4571",
  "branchId": 1
}'

Example 3: GET branch
curl --location --request GET 'http://localhost:3000/api/v1/branch' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Harman Kaur",
  "position": "Student",
  "department": "IT",
  "email": "harman.kaur@gmail.com",
  "phone": "204-588-4571",
  "branchId": 1
}'

# Link to Public Documentation

You can access all the detailed information about all endpoints at:
   https://harmankaur358.github.io/Assignment_2-back-end-/

# Local Documentation Access

1:Start your server using:
npm start

2:Open the browser and visit:
http://localhost:3000/api-docs/

You will be successfully able to access all endpoints of employee and branch, as well as the schemas.
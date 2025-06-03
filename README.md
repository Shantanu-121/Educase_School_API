# Educase School API
A RESTful API backend built with Node.js and MySQL for managing school data. This API supports adding new schools and listing schools ordered by proximity to a given location.

# Features
Add School: Add a school record with validated inputs.

List Schools by Proximity: Retrieve all schools ordered by distance from a user-specified latitude and longitude.

# API Endpoints
1. POST / "/addSchool"
Adds a new school to the database.

Request Body Parameters:
* name	- String	(Name of the school)
* address - String	(School address)
* latitude	- Float	(Geographical latitude)
* longitude - Float	(Geographical longitude)

Description:
Validates input data to ensure consistency before storing the school information in the database.

2. GET / "/listSchools"
Retrieves a list of all schools ordered by proximity to the given coordinates.

Query Parameters:
* latitude	- Float	(Latitude of the user's location)
* longitude - Float	(Longitude of the user's location)

Response:
Returns an array of schools sorted by distance from the provided location.

# Getting Started

1. Clone the repository
   
```console
git clone https://github.com/Shantanu-121/Educase_School_API.git
```

2. Install dependencies and run the server

```console
cd root_directory_name
npm i
node index.js
```
The API server will start on http://localhost:4000.

# Testing the API
You can test the API endpoints using Postman or any other API client:

Base URL: http://localhost:4000

Endpoints: /addSchool (POST), /listSchools (GET)

# Hosted API

The API is deployed and accessible online:

https://educaseschoolapi-production.up.railway.app/

# Technologies Used
1. Node.js
2. Express.js
3. MySQL
4. Data validation

# License
This project is licensed under the MIT License.

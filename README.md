# Cities REST API if you wish to test it in POSTMAN TESTED or simply refer my World Tour Site (fake email and password get it from repo) 

## PLEASE TEST API IN POSTMAN using this URL and add the below mention City and User route for testing as per requirement 

https://world-tour-city-api.onrender.com  
use fake credentials/data, avoid sharing any real secrets and fields required are :
- "name": "yourname",
- "email": "random@gmail.com", 
- "password": "1234123",
- "passwordConfirm": "12341234",

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- Postman

### Authentication & Authorization

- User signup
- User login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt

### Tours API

- Get all cities
- Add a city
- Delete a city

### Database

- MongoDB Atlas
- Mongoose schemas and models
- Data validation
- Mongoose middleware
- Query middleware

## API Routes

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/users/signup` | Create a new user |
| POST | `/api/v1/users/login` | Login user |

### Cities

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/cities` | Get all cities |
| GET | `/api/v1/cities/:id` | Get a single city |
| POST | `/api/v1/cities` | Add a city |
| DELETE | `/api/v1/cities/:id` | Delete a city |

Protected routes uses a JWT Cookies 

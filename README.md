# Full stack Blog Project

- Individual Assignment, Total 30 points
- Technologies required: React, Node, Express, MongoDB, Javascript, CSS, HTML, GitHub
- Deadline: 2nd of May, 2023 (10 am Finnish Time)

## Back-end (17 points)

### Backend Setup

- Go to server folder then `npm install` to install all the packages. Feel free to add or remove packages based on your need.
- Run the project -> `npm run dev`

### User API -> /api/users (7 points)

- API Should have the following feature
  - User CRUD Operation (4 points)
    - Create User
      - User Registartion -> /
        - use jwt to store the user inputs temporarily
        - send the account activation email
      - User Activation -> /activate
        - activate the user by verifying the token
        - store the user in database
    - Endpoints:
      - /:id -> Read, update, delete user,
      - /all-users -> get all the users (Only for Admin)
  - Password related operations (3 points)
    - Endpoints: /update-password, /forget-password, /reset-password

### Auth API -> /api/auth (5 Points)

- API Should have the following features implemting the token based authorization
  - Endpoints: /login, /logout, /refresh-token
  - Middlewares: isAuthorized, isAdmin

### Blog API -> /api/blogs (5 Points)

- API Should have the following features
  - Endpoints:
    - / -> Create a blog (Only for Admin)
    - / -> Read all blogs
    - /:id -> Read single blog
    - /:id -> Update single blog (Only for Admin)
    - /:id -> Delete single blog (Only for Admin)
    - /all-blogs -> get all the blogs (Only for Admin)

## Front-end (10 points)

### Front-end Setup

- Go to client folder then `npm install` to install all the packages. Feel free to add or remove packages based on your need.
- Run the project -> `npm start`

### Pages & routing

- try to consume the all the API's you created
- remember to protect routes based on logged in, loggedout , admin status

- / -> Home page (tell the visitiors about the website)
- /login -> Login Page
- /register -> Register Page
- /activate -> Activate User Page
- /forget -> Forget password Page
- /reset -> Reset password Page
- /contact -> Contact Page
- /profile -> User/Admin Profile Page (includes update and delete features)
- /blogs -> Blogs Page -> render all the blogs use pagination & searching
- /blog -> Details of a single Blog Page inclues update blog or delete blog options if the user is an admin
- /create-blog -> Create Blog Page (Only For Admin)

## 3 points extra for creative or additional features

[copyright - this project was created for Anisul's YouTube Channel and shared for student's benefits]

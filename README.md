Table of contents:
1. Introduction and aims of MyFlix
2. Screenshots of MyFlix
3. Learning outcomes of the project
4. Link to the app
5. Technologies and dependencies
6. Endpoints in the MyFlix API

1. Introduction and aims of MyFlix
 MyFlix is a web application that provides users with information about movies. Using the MyFlix app, users can access information about movies, directors and genres, as well as sign up to the app, update their personal infomation and save movies to their own "Favourite Movies" list.
 In this project I created the server side component (API: Application programming interface) for the MyFlix app. Data about movies, directors, genres and users are stored in the database, which will later be used for a client-side project.

2. Screenshots of MyFlix
Welcome Page of MyFlix:
![Welcome page of MyFlix](https://github.com/user-attachments/assets/76f08a1b-ed4d-46d4-90ec-6fb328bde5ee)

Creating a new user (in Postman)
![Valid data entry creating a new user](https://github.com/user-attachments/assets/5ea68f2b-4b35-41ea-a87c-29bf1161e945)

Searching for a movie by title (in Postman)
![Get movie by title](https://github.com/user-attachments/assets/38e85a98-77de-4e94-93c7-ea6bf91ae114)

3. Learning outcomes of the project
● Created an API using Node.js and Express.
● Created an API that uses REST architecture.
● Used three middleware modules i.e. body-parser package for reading data from requests and morgan for logging.
● Created a “package.json” file to list dependenices.
● The database was built using MongoDB.
● The business logic is modeled with Mongoose.
● The API provides movie information in JSON format.
● Tested API extensively in Postman.
● The API includes user authentication and authorization code, and data validation logic.
● Learned about and ensured API meets data security regulations.
● The API is deployed to Heroku.

4. Link to the app
MyFlix app can be accessed here: https://hannahs-myflix-03787a843e96.herokuapp.com/
Documentation is accessible here: https://hannahs-myflix-03787a843e96.herokuapp.com/documentation

5. Technologies and Dependencies
Techologies:
*Node.js
*MongoDB (with MongoDB Atlas)
*Postman

Dependencies:
* bcrypt
* body-parser
* cors
* express
* express-validator,
* jsonwebtoken
* mongoose
* morgan
* passport
* passport-jwt
* passport-local
* uuid

6. Endpoints in the MyFlix API
Login for existing users: https://hannahs-myflix-03787a843e96.herokuapp.com/login

Return a list of all movies: https://hannahs-myflix-03787a843e96.herokuapp.com/movies

Return a movie by title: https://hannahs-myflix-03787a843e96.herokuapp.com/movies/:title (e.g. https://hannahs-myflix-03787a843e96.herokuapp.com/movies/The%20Notebook)

Return a movie by genre: https://hannahs-myflix-03787a843e96.herokuapp.com/genre/:genre

Return a movie by director: https://hannahs-myflix-03787a843e96.herokuapp.com/movies/directors/:Name

Return a list of registered users: https://hannahs-myflix-03787a843e96.herokuapp.com/users

Update/delete a user's information: https://hannahs-myflix-03787a843e96.herokuapp.com/users/:id

Update/Delete a favourite movie: https://hannahs-myflix-03787a843e96.herokuapp.com/users/:id/:MovieTitle

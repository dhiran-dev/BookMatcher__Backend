# The BookMatcher - Docs

# Project objective:

- The goal is to create a user interface that can display books according to the user’s preferences
- The preferences that that user has to provide inputs for are 1).Genre 2).Number of pages
- Once the user submits these two preferences, the api will fetch the available books in database and sort them in a way the closely matches with the user’s preference
- Top priority =⇒ Genre
- Secondary priority =⇒ Number of pages
- The api call from the home page will try to fetch the books that first match with the genre specified by the user and then only it sort the books according to pages.
- Furthermore, an admin panel is created to facilitate adding books to the database
- Fetching books data from an empty database will result in error and thus the Admin panel page will serve the function to add books to the database
  -To run this project, you will need to add the following environment variables to your .env file

  1.`MONGO_URI`

  2.`FETCHBOOKS_URL` 3.`ADDBOOK_URL`

## Tech Stack:

- NextJS
- NodeJS + ExpressJS
- Shadcn
- Tailwindcss
- MongoDB

## Getting Started :

### Setting up Backend

- “npm install” to install dependencies
- Create a MongoDB database and add the connection in .env file
- MONGO_URI = “Your Database link”
- “npm run dev” to start nodemon
- or “node index.js” to start the server without nodemon

### Setting up Frontend

- “npm install” to install dependencies
- Add API URL’s in the next.congif.js :

```jsx
env: {
    FETCHBOOKS_URL: "http://localhost:8080/api/fetchbooks",
    ADDBOOK_URL: "http://localhost:8080/api/addbook",
  },
```

- “npm run dev” to start the development server
- Add books to database using the form in Admin panel page before using the home page
- Admin panel is to be used to add books data to the database (to ease testing the fetchbooks api)

### Usage

Step 1 :

- Navigate to Admin panel
- Add books by submitting the books data in the form
- The form needs all four data inputs : Title, Author, Genre, Number of Pages
- User will face an error, if they try to submit an incomplete error

Step 2 :

- Navigate to Home
- Input your preferences by submitting Genre and Number of pages in the form
- The form needs all three data inputs : Username, Genre, Number of Pages
- User will face an error, if they try to submit an incomplete error

## Feature and Validation:

### Frontend:

- Added validation to all input and select fields in the form so that user cannot submit an empty form
- Dark mode
- Active classname to show current page
- Loading button to show users that the API call is in progress
- Toast component from shadcn ui library to show success or error notifications
- Table component from shadcn ui library to show books data after fetching

### Backend:

- Two MongoDB schemas : User, Books
- /**addbook** POST method to add a book data into the database
- **/fetchbook** POST method api to fetch books from the database
- /adduser POST method api to add user information to the database (not implement in frontend)
- Added validation to check duplicate user entry into database
- Added validation to check duplicate books entry into database
- Added validation to check empty or incomplete req.body
- if an user has a data object available in the database, multiple preferences will be pushed into the array
- The books are sorted by genre first and then by number of pages

## Example :

![Untitled](https://maize-magpie-5dd.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F30386dd9-d13a-4958-9575-0c91915e5c0e%2F19332111-c2a8-4835-b521-d035d0c43b55%2FUntitled.png?table=block&id=fbbdb80b-6fa1-4dd4-a370-90c354ce0d43&spaceId=30386dd9-d13a-4958-9575-0c91915e5c0e&width=2000&userId=&cache=v2)

- In the above image, the user is trying to fetch books with genre “Dystopian” with “200” pages.
- The books are fetched according to the genre first and then the number of pages

![Untitled](https://maize-magpie-5dd.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F30386dd9-d13a-4958-9575-0c91915e5c0e%2F36a139c7-4e98-447d-92a1-98165f74b38b%2FUntitled.png?table=block&id=e01c23c4-6116-44f8-96c8-d3c3f38af9f0&spaceId=30386dd9-d13a-4958-9575-0c91915e5c0e&width=1290&userId=&cache=v2)

Here in this example the book of genre “Dystopian” with 288 pages is the closest match to the user’s preference.

- Backend Github link : https://github.com/dhiran-dev/BookMatcher__Backend
- Frontend Github link : https://github.com/dhiran-dev/BookMatcher_Frontend

## Author : Dhiran P N B

“Reach Best Full Stack Engineer Application 2023”

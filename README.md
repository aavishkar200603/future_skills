# future_skills

TO RUN FRONTEND USE : "npm install" and then use "npm start" inside frontend directory
TO RUN BACKEND USE : "npm install" and then use "npm run dev" or "node server.js" or "npm start" inside backend directory
IMPORTANT : ADD YOU DATABASE URL BEFORE RUNNING BACKEND

NOW WHAT FUNCTIONALITIES AHVE BEEN ADDED :
Frontend :
Search Cards: Users can search for specific card by title using the search input field.
Create New Card: Users can submit a form to create a new card with a title and description. The new card will be added to the list and stored in the database.
Clear Search Filter: Users can clear the search filter to view all cards.

Backend :
Fetch All Cards: The /getCards endpoint retrieves all cards from the MongoDB database.
Fetch Card by Title: The /cards endpoint allows searching for a card by title.
Create Card: The /createCard endpoint allows creating a new card with a title and description.

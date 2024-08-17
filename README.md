# Future Skills

## To Run Frontend

1. Navigate to the frontend directory:
    cd frontend

2. Install dependencies:
    npm install


3. Start the frontend server:
    npm start


## To Run Backend

1. Navigate to the backend directory:
    cd backend

2. Install dependencies:
   npm install


3. **Important:** Add your database URL before running the backend.

4. Start the backend server:
 
    npm run dev

    node server.js
 
    npm start


## Functionalities Added

### Frontend

- **Search Cards:** Users can search for a specific card by title using the search input field.
- **Create New Card:** Users can submit a form to create a new card with a title and description. The new card will be added to the list and stored in the database.
- **Clear Search Filter:** Users can clear the search filter to view all cards.

### Backend

- **Fetch All Cards:** The `/getCards` endpoint retrieves all cards from the MongoDB database.
- **Fetch Card by Title:** The `/cards` endpoint allows searching for a card by title.
- **Create Card:** The `/createCard` endpoint allows creating a new card with a title and description.

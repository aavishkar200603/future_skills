
const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const cors = require('cors'); 


const Card = require('./models/Card');
const { v4: uuidv4 } = require('uuid');
app.use(cors());

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//add your local mongodb database url  or maybe atlas mongodb database
//mongodb+srv:<username>:<password>@cluster0.mongodb.net/<yourDatabaseName>
mongoose.connect('mongodb+srv:<username>:<password>@cluster0.mongodb.net/<yourDatabaseName>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});



app.post('/createCard', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newCard = new Card({ id: uuidv4(), title, description });
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: 'Error creating card', error });
    }
});

app.get('/getCards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cards', error });
    }
});

app.get('/cards', async (req, res) => {
    try {
      const title = req.query.title; // Get the title from query parameters
      console.log(`Searching for card with title: ${title}`); // Debug log
      const card = await Card.findOne({ title });
      if (!card) return res.status(404).json({ message: 'Card not found' });
      res.status(200).json(card);
    } catch (error) {
      console.error('Error retrieving card:', error); // Error log
      res.status(500).json({ message: 'Error retrieving card', error });
    }
  });
  

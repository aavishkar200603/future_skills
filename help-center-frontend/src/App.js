

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { MdHelpOutline } from 'react-icons/md';

const App = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]); // For displaying filtered cards
  const [searchTitle, setSearchTitle] = useState('');
  const [specificCard, setSpecificCard] = useState(null);
  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
  });

  const fetchAllCards = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getCards');
      setCards(response.data);
      setFilteredCards(response.data); // Initialize filteredCards with all cards
    } catch (error) {
      console.error('Error fetching cards', error);
    }
  };

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchCardByTitle = async () => {
    toast.loading('Searching...'); // Show loading toast
    try {
      const response = await axios.get('http://localhost:4000/cards', {
        params: { title: searchTitle } // Send the searchTitle as a query parameter
      });
      setSpecificCard(response.data);
      // setFilteredCards([response.data]); // Show only the searched card
      toast.dismiss(); // Dismiss the loading toast
      toast.success('Card found!'); // Show success toast
    } catch (error) {
      toast.dismiss(); // Dismiss the loading toast
      toast.error('Error fetching card'); // Show error toast
      console.error('Error fetching specific card', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.loading('Creating card...'); // Show loading toast
    try {
      const response = await axios.post('http://localhost:4000/createCard', newCard);
      toast.dismiss(); // Dismiss the loading toast
      toast.success('Card submitted successfully!'); // Show success toast
      setNewCard({ title: '', description: '' }); // Reset the form after submission
      fetchAllCards(); // Optionally, fetch the updated list of cards after submission
    } catch (error) {
      toast.dismiss(); // Dismiss the loading toast
      toast.error('Error submitting card'); // Show error toast
      console.error('Error submitting card', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const clearSearchFilter = () => {
    setSearchTitle('');
    setFilteredCards(cards); // Show all cards
    setSpecificCard(null); // Clear the specific card
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Toaster /> {/* Add this to render toast notifications */}
      <header className="bg-black text-white flex justify-between p-4">
        <div className="flex items-center">
        <MdHelpOutline
            className="text-white h-8 w-8" // Style the icon
            aria-label="Help Center"
          />
          <h1 className="ml-2 text-lg font-bold">Help Center</h1>
        </div>
        <button className="bg-gray-800 px-4 py-2 rounded">
          Submit a request
        </button>
      </header>

      <main className="flex-grow bg-purple-100 p-8 text-center">
        <h2 className="text-4xl font-bold mb-6">How can we help?</h2>
        <div className="relative max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full p-4 rounded border border-gray-300"
          />
          <button
            onClick={fetchCardByTitle}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-white border border-gray-300 rounded"
          >
            →
          </button>
        </div>

        {specificCard && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
            <h3 className="font-semibold text-xl mb-2">{specificCard.title}</h3>
            <p className="text-gray-600">{specificCard.description}</p>
          </div>
        )}

        {filteredCards.length === 0 && !specificCard && (
          <p className="text-gray-600">No cards found.</p>
        )}

        <button
          onClick={clearSearchFilter}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg mb-6"
        >
          Clear Search Filter
        </button>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
          <h3 className="font-semibold text-xl mb-4">Create a New Card</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={newCard.title}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={newCard.description}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-gray-300"
              required
            />
          </div>
         
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      </main>

      <section className="bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
          {filteredCards.map(card => (
            <Card key={card._id} title={card.title} description={card.description} />
          ))}
        </div>
      </section>

      <footer className="bg-black text-white py-8 mt-8">
        <div className="max-w-screen-lg mx-auto flex flex-wrap justify-between">
          <div className="mb-4">
            <h3 className="font-bold">Abstract</h3>
            <ul>
              <li><a href="#" className="text-gray-400">Branches</a></li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Resources</h3>
            <ul>
              <li><a href="#" className="text-gray-400">Blog</a></li>
              <li><a href="#" className="text-gray-400">Help Center</a></li>
              <li><a href="#" className="text-gray-400">Release Notes</a></li>
              <li><a href="#" className="text-gray-400">Status</a></li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Community</h3>
            <ul>
              <li><a href="#" className="text-gray-400">Twitter</a></li>
              <li><a href="#" className="text-gray-400">LinkedIn</a></li>
              <li><a href="#" className="text-gray-400">Facebook</a></li>
              <li><a href="#" className="text-gray-400">Dribbble</a></li>
              <li><a href="#" className="text-gray-400">Podcast</a></li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Company</h3>
            <ul>
              <li><a href="#" className="text-gray-400">About Us</a></li>
              <li><a href="#" className="text-gray-400">Careers</a></li>
              <li><a href="#" className="text-gray-400">Legal</a></li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Contact Us</h3>
            <ul>
              <li><a href="#" className="text-gray-400">info@abstract.com</a></li>
              <li><a href="#" className="text-gray-400">Support</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Card = ({ title, description }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-2">
      {title}
    </h3>
    <p>{description}</p>
  </div>
);

export default App;


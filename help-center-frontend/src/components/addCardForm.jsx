import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCardForm = () => {
  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
    // Add other fields according to your backend model
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.loading('Creating card...'); // Show loading toast
    try {
      await axios.post('http://localhost:4000/createCard', newCard);
      toast.dismiss(); // Dismiss the loading toast
      toast.success('Card submitted successfully!'); // Show success toast
      setNewCard({ title: '', description: '' }); // Reset the form after submission
    } catch (error) {
      toast.dismiss(); // Dismiss the loading toast
      toast.error('Error submitting card'); // Show error toast
      console.error('Error submitting card', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="font-semibold text-xl mb-4">Create a New Card</h3>
      <form onSubmit={handleSubmit}>
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
        {/* Add other input fields as required by your card model */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCardForm;

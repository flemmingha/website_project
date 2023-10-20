import React, { useState, useEffect } from "react";
import axios from 'axios';

function SaveTicker() {
  const [selectedTicker, setSelectedTicker] = useState('');
  const [csrfToken, setCsrfToken] = useState(''); // State to store the CSRF token

  useEffect(() => {
    // Fetch the CSRF token when the component mounts
    axios.get('http://localhost:8000/get-csrf-token/')
      .then(response => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []); // The empty dependency array ensures this only runs once when the component mounts

  function saveSelectedTicker() {
    // Include the CSRF token in the request headers
    axios.post('http://localhost:8000/save_ticker/', { selected_ticker: selectedTicker }, {
      headers: {
        'X-CSRFToken': csrfToken, // Include the CSRF token
      }
    })
      .then(response => {
        console.log('Ticker saved successfully:', response.data.message);
        // Handle the response here if needed
      })
      .catch(error => {
        console.error('Error saving ticker:', error);
        // Handle errors here
      });
  }

  return (
    <div>
      <h2>Save Ticker</h2>
      <label>
        Select Ticker:
        <input
          type="text"
          value={selectedTicker}
          onChange={(e) => setSelectedTicker(e.target.value)}
        />
      </label>
      <button onClick={saveSelectedTicker}>Save Ticker</button>
    </div>
  );
}

export default SaveTicker;

import React from 'react';
import axios from 'axios';

function SaveData({ data }) {
  const axiosInstance = axios.create();

  const saveData = () => {
    const { ticker, openingPrice, closingPrice, quantity, totalValueUSD, totalValueDKK } = data;

    const requestData = {
      ticker,
      opening_price: openingPrice,
      closing_price: closingPrice,
      quantity: parseInt(quantity),
      total_value_usd: totalValueUSD,
      total_value_dkk: totalValueDKK,
    };

    axiosInstance.post('http://localhost:8000/save_ticker/', requestData)
      .then(response => {
        console.log('Data saved successfully', response);
      })
      .catch(error => {
        console.error('Error saving data to Django:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      });
  };

  return <button onClick={saveData}>Save</button>;
}

export default SaveData;

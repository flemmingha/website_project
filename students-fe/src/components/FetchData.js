import React from 'react';
import axios from 'axios';

function FetchData({ selectedTicker, updateData }) {
  const axiosInstance = axios.create();

  const fetchData = () => {
    axiosInstance.get(`https://api.polygon.io/v2/aggs/ticker/${selectedTicker}/range/1/day/2023-01-09/2023-01-09?apiKey=wS1qEJjs3M9UE6r8Ca1ovmJp50yt_nie`)
      .then(res => {
        const data = res.data;
        const { results } = data;

        if (results.length > 0) {
          const lastResult = results[results.length - 1];
          const ticker = selectedTicker;
          const openingPrice = lastResult.o;
          const closingPrice = lastResult.c;

          updateData({ ticker, openingPrice, closingPrice });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return <button onClick={fetchData}>Fetch Data</button>;
}

export default FetchData;

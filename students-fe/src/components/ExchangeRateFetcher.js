import React, { Component } from "react";

const API_KEY = '2wU33OCwTwVUmNdlI3qOndGcQLadehhS';
const EXCHANGE_RATE_API_URL = `http://api.apilayer.com/currency_data/live?source=USD&currencies=DKK&apikey=${API_KEY}`;

class ExchangeRateFetcher extends Component {
  state = {
    exchangeRate: null, // State to store the fetched exchange rate
    loading: true, // State to track loading status
  };

  componentDidMount() {
    // Fetch the exchange rate when the component mounts
    fetch(EXCHANGE_RATE_API_URL, {
      method: 'GET',
      headers: {
        'apikey': API_KEY,
      }
    })
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.exchange_rate.DKK; // Assuming the structure of the API response
      this.setState({ exchangeRate, loading: false });
    })
    .catch(error => {
      // Handle errors if the exchange rate cannot be fetched
      console.error('Error fetching exchange rate:', error);
      this.setState({ loading: false });
    });
  }

  render() {
    const { exchangeRate, loading } = this.state;

    return (
      <div>
        {loading ? (
          <p>Loading exchange rate...</p>
        ) : (
          <p>Exchange Rate: {exchangeRate}</p>
        )}
      </div>
    );
  }
}

export default ExchangeRateFetcher;
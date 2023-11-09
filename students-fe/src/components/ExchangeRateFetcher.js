import React, { Component } from "react";
import axios from 'axios';

const API_KEY = '2wU33OCwTwVUmNdlI3qOndGcQLadehhS';
const EXCHANGE_RATE_API_URL = `http://api.apilayer.com/currency_data/live?source=USD&currencies=DKK`;

class ExchangeRateFetcher extends Component {
  state = {
    exchangeRate: null,
  };

  componentDidMount() {
    axios
      .get('http://api.apilayer.com/currency_data/live?source=USD&currencies=DKK', {
        headers: { 'apikey': API_KEY },
      })
      .then((response) => {
        const usdToDkkRate = response.data.quotes.USDDKK;
        if (!isNaN(usdToDkkRate)) {
          this.setState({ exchangeRate: usdToDkkRate });
          this.sendExchangeRate(usdToDkkRate);
        } else {
          console.error('Invalid exchange rate:', usdToDkkRate);
        }
      })
      .catch((error) => {
        console.error('Error fetching exchange rate:', error);
      });
  }

  sendExchangeRate = (exchangeRate) => {
    axios
      .post('http://localhost:8000/save_exchange_rate', { exchangeRate }) // Adjust the URL to your backend
      .then((response) => {
        console.log('Exchange rate sent to the backend:', response.data);
      })
      .catch((error) => {
        console.error('Error sending exchange rate to the backend:', error);
      });
  };

  render() {
    // Your rendering logic, such as loaders or UI elements
    return <div>{/* Loader or UI elements */}</div>;
  }
}

export default ExchangeRateFetcher;
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
      .get(EXCHANGE_RATE_API_URL, { headers: { 'apikey': API_KEY } })
      .then((response) => {
        const usdToDkkRate = response.data.quotes.USDDKK;
        if (!isNaN(usdToDkkRate)) {
          this.setState({ exchangeRate: usdToDkkRate });
          this.props.setExchangeRate(usdToDkkRate); // Ensure that this is being called correctly
          console.log('Exchange rate set in ExchangeRateFetcher:', usdToDkkRate);
        } else {
          console.error('Invalid exchange rate:', usdToDkkRate);
        }
      })
      .catch((error) => {
        console.error('Error fetching exchange rate:', error);
      });
  }

  render() {
    // Your rendering logic, such as loaders or UI elements
    return <div>{/* Loader or UI elements */}</div>;
  }
}

export default ExchangeRateFetcher;

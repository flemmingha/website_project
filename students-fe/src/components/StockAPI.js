import React, { Component } from "react";
import axios from 'axios';
import SaveTicker from './SaveTicker'; // Import the SaveTicker component

const tableStyle = {
  border: '1px solid #ddd',
  borderCollapse: 'collapse',
  width: '50%',
  margin: '0 auto', // Center the table
  marginTop: '50px', // Adding margin to the top of the container
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
};

const containerStyle = {
  marginTop: '20px', // Adding margin to the top of the container
  marginBottom: '20px', // Adding margin to the bottom of the container
};

class Stock extends Component {
  state = {
    ticker: '',
    openingPrice: '',
    closingPrice: '',
    selectedTicker: 'AAPL', // Default selected ticker
    quantity: 1, // Default quantity
    totalValueUSD: 0, // Total value in USD
    totalValueDKK: 0, // Total value in DKK
  }

    // Custom Axios instance with CSRF token header
    axiosInstance = axios.create();

   // Fetch CSRF token from Django backend
   fetchCSRFToken = () => {
    axios.get('http://localhost:8000/get-csrf-token/')
      .then(response => {
        const csrftoken = response.data.csrftoken;
        // Set CSRF token for all Axios requests
        axios.defaults.headers.common['X-CSRFTOKEN'] = csrftoken;
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
      });
  }

  // Call fetchCSRFToken when the component mounts
  componentDidMount() {
    this.fetchCSRFToken();
  }


  handleTickerChange = (event) => {
    this.setState({ selectedTicker: event.target.value });
  }

  handleQuantityChange = (event) => {
    this.setState({ quantity: event.target.value });
  }
 
  fetchData = () => {
    // Use the custom Axios instance for fetching data
    this.axiosInstance.get(`https://api.polygon.io/v2/aggs/ticker/${this.state.selectedTicker}/range/1/day/2023-01-09/2023-01-09?apiKey=wS1qEJjs3M9UE6r8Ca1ovmJp50yt_nie`)
      .then(res => {
      const data = res.data;
      const { ticker, results } = data;

      if (results.length > 0) {
        const lastResult = results[results.length - 1];
        const openingPrice = lastResult.o;
        const closingPrice = lastResult.c;

        this.setState({ ticker, openingPrice, closingPrice }, this.calculateTotalValue);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

  calculateTotalValue = () => {
    const { openingPrice, quantity } = this.state;
    const totalValueUSD = openingPrice * quantity;

    // Example exchange rate from USD to DKK (you can get the latest rates from an exchange rate API)
    const usdToDkkRate = 6.42; // Replace with the actual rate

    const totalValueDKK = totalValueUSD * usdToDkkRate;

    this.setState({ totalValueUSD, totalValueDKK });
  }

  saveData = () => {
    const { ticker, openingPrice, closingPrice } = this.state;
  
    this.axiosInstance.post('http://localhost:8000/save-ticker-data/', {
      ticker,
      opening_price: openingPrice,
      closing_price: closingPrice
    })
      .then(response => {
        console.log('Data saved successfully', response); // Log the response
      })
      .catch(error => {
        console.error('Error saving data to Django:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      });
  }
  

  render() {
    return (
      <div style={containerStyle}>
        <h1>Ticker Data</h1>
        <label>
          Select Ticker:
          <select value={this.state.selectedTicker} onChange={this.handleTickerChange}>
            <option value="AAPL">AAPL</option>
            <option value="GOOGL">GOOGL</option>
            <option value="MSFT">MSFT</option>
            <option value="AMZN">AMZN</option>
          </select>
        </label>
        <label>
          Quantity:
          <input type="number" value={this.state.quantity} onChange={this.handleQuantityChange} />
        </label>
        <button onClick={this.fetchData}>Fetch Data</button>
        <button onClick={this.saveData}>Save</button> {/* New button to save data */}
        {/* <SaveTicker /> Include the SaveTicker component here */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Ticker</th>
              <th style={cellStyle}>Opening Price</th>
              <th style={cellStyle}>Quantity</th>
              <th style={cellStyle}>Total Value (USD)</th>
              <th style={cellStyle}>Total Value (DKK)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>{this.state.ticker}</td>
              <td style={cellStyle}>{this.state.openingPrice}</td>
              <td style={cellStyle}>{this.state.quantity}</td>
              <td style={cellStyle}>{this.state.totalValueUSD}</td>
              <td style={cellStyle}>{this.state.totalValueDKK}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Stock;

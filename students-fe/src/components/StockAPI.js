import React, { Component } from "react";
import axios from 'axios';
import SaveTicker from './SaveTicker'; // Import the SaveTicker component

const tableStyle = {
  border: '1px solid #ddd',
  borderCollapse: 'collapse',
  width: '50%',
  margin: '0 auto', // Center the table
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
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

  handleTickerChange = (event) => {
    this.setState({ selectedTicker: event.target.value });
  }

  handleQuantityChange = (event) => {
    this.setState({ quantity: event.target.value });
  }

  fetchData = () => {
    axios.get(`https://api.polygon.io/v2/aggs/ticker/${this.state.selectedTicker}/range/1/day/2023-01-09/2023-01-09?apiKey=wS1qEJjs3M9UE6r8Ca1ovmJp50yt_nie`)
      .then(res => {
        const data = res.data;
        const { ticker, results } = data;

        if (results.length > 0) {
          const lastResult = results[results.length - 1]; // Get the last data point
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

  render() {
    return (
      <div>
        <h1>Ticker Data</h1>
        <label>
          Select Ticker:
          <select value={this.state.selectedTicker} onChange={this.handleTickerChange}>
            <option value="AAPL">AAPL</option>
            <option value="GOOGL">GOOGL</option>
            <option value="MSFT">MSFT</option>
          </select>
        </label>
        <label>
          Quantity:
          <input type="number" value={this.state.quantity} onChange={this.handleQuantityChange} />
        </label>
        <button onClick={this.fetchData}>Fetch Data</button>
        <SaveTicker /> {/* Include the SaveTicker component here */}
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

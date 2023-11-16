import React, { Component } from "react";
import axios from 'axios';
import FetchData from './FetchData';
import SaveData from './SaveData';
import ExchangeRateFetcher from './ExchangeRateFetcher'; // New component for fetching exchange rate


const tableStyle = {
  border: '1px solid #ddd',
  borderCollapse: 'collapse',
  width: '50%',
  margin: '0 auto',
  marginTop: '50px',
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
};

const containerStyle = {
  marginTop: '20px',
  marginBottom: '20px',
};

class StockAPI extends Component {
  state = {
    ticker: '',
    openingPrice: '',
    closingPrice: '',
    selectedTicker: 'AAPL',
    quantity: 1,
    totalValueUSD: 0,
    totalValueDKK: 0,
    usdToDkkRate: 6.42, // Set an initial value for USD to DKK rate
  };

  handleTickerChange = (event) => {
    this.setState({ selectedTicker: event.target.value });
  }

  handleQuantityChange = (event) => {
    this.setState({ quantity: event.target.value });
  }

  setExchangeRate = (usdToDkkRate) => {
    this.setState({ usdToDkkRate }, () => {
      this.calculateTotalValue(); // Call the function as a callback to ensure it uses the updated state
    });
  }

  updateData = (data) => {
    this.setState(data, this.calculateTotalValue);
  }

  calculateTotalValue = () => {
    const { openingPrice, quantity, usdToDkkRate } = this.state;
    const totalValueUSD = openingPrice * quantity;
    const totalValueDKK = totalValueUSD * usdToDkkRate;
  
    this.setState({ totalValueUSD, totalValueDKK });
  }
  
  render() {
    return (
      <div style={containerStyle}>
        <h1>Ticker Data</h1>
        <ExchangeRateFetcher setExchangeRate={this.setExchangeRate} />
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
        <FetchData selectedTicker={this.state.selectedTicker} updateData={this.updateData} />
        <SaveData data={this.state} />
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

export default StockAPI;

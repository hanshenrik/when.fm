import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

import './App.css';

import hightchartsConfig from '../../config/highcharts.js';

import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Search from '../Search/Search.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { chart: null };
  }

  componentDidMount() {
    this.setState({
      chart: this.refs.chart.getChart(),
    });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Search chart={this.state.chart} />
        <div className="result">
          <ReactHighcharts isPureConfig config={hightchartsConfig} ref="chart" />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

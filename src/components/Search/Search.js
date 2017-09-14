import React, { Component } from 'react';
import axios from 'axios';
import { FaStopCircle } from 'react-icons/lib/fa';

import './Search.css';

import lastFmClient from '../../clients/lastFmClient.js';

import Button from '../Buttons/Button.js';
import Input from '../Input/Input.js';
import Loader from '../Loader/Loader.js';
import ErrorMessage from '../Messages/ErrorMessage.js';
import InfoMessage from '../Messages/InfoMessage.js';
import SuccessMessage from '../Messages/SuccessMessage.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fetchedUsername: null,
      isFetchingData: false,
      isFinishedFetchingData: false,
      isAborted: false,
      error: null,
      axiosSource: null,
      progress: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAbort = this.handleAbort.bind(this);
  }

  handleError = (message) => {
    this.setState({
      isFetchingData: false,
      error: message,
    });

    this.usernameInput.focus();
  }

  fetchNextPage = (page) => {
    console.log(`Fetching page ${page}`);
    // TODO: might need to do this somewhere else to be able to abort previous when doing new search
    var axiosSource = axios.CancelToken.source();
    this.setState({ axiosSource: axiosSource });

    lastFmClient.get('/', {
      cancelToken: axiosSource.token,
      params: {
        user: this.state.username,
        page: page,
      }
    })
      .then(response => {
        if (response.data.error) {
          this.handleError(response.data.message);
          return;
        }

        const metadata = response.data.recenttracks['@attr'];
        const tracks = response.data.recenttracks.track;
        const page = parseInt(metadata.page, 10);
        const totalPages = parseInt(metadata.totalPages, 10);

        this.setState({ progress: (page/totalPages)*100 })

        if (totalPages < 1) {
          this.handleError('No data found');
          return;
        }

        let newData = [...this.props.chart.series[0].data];

        tracks
          .filter(track => track.date) // filter out tracks missing date (e.g. 'currently playing')
          .forEach(track => {
            const hour = parseInt(new Date(parseInt(track.date.uts, 10) * 1000).getHours(), 10);
            newData[hour].y = newData[hour].y + 1;
          });

        // Update the chart with this page's data
        this.props.chart.series[0].setData(newData);

        if (parseInt(page, 10) >= parseInt(totalPages, 10)) {
          console.log('Finished!')
          this.setState({
            isFetchingData: false,
            isFinishedFetchingData: true,
          });
        }
        else {
          console.log('else');
          this.fetchNextPage(page + 1);
        }
      })
      .catch(error => {
        console.log(error)
        if (error.response) {
          this.handleError(error.response.data.message);
        }
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.axiosSource) this.state.axiosSource.cancel('Operation canceled: New username requested.');

    this.setState({
      isFetchingData: true,
      isFinishedFetchingData: false,
      fetchedUsername: this.state.username,
      isAborted: false,
      error: null,
    });

    this.fetchNextPage(1);

    this.props.chart.setTitle({ text: `${this.state.username}'s listening pattern` });
    this.props.chart.series[0].setData(new Array(24).fill(0));
  };

  handleAbort = (event) => {
    this.state.axiosSource.cancel('Operation canceled by the user.');

    this.setState({
      isFetchingData: false,
      isAborted: true,
    });
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <Input
            autoFocus={true}
            name="username"
            type="text"
            placeholder="last.fm username"
            value={this.state.username}
            onChange={this.handleChange}
            isLoading={this.state.isFetchingData}
            disabled={this.state.isFetchingData}
            innerRef={(input) => { this.usernameInput = input }}
          />
        </form>
        <div className="search-info">
          {this.state.isFetchingData && <Button onClick={this.handleAbort} disabled={!this.state.isFetchingData}><FaStopCircle />&nbsp;Abort</Button>}
          {this.state.isFinishedFetchingData && <SuccessMessage>Finished fetching data for <strong>{this.state.fetchedUsername}</strong>!</SuccessMessage>}
          {this.state.isAborted && <InfoMessage>Aborted fetching more data for <strong>{this.state.fetchedUsername}</strong></InfoMessage>}
          {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
        </div>
        <Loader progress={this.state.progress} />
      </div>
    );
  }
}

export default Search;

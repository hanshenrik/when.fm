const hightchartsConfig = {
  chart: {
    type: 'column',
    animation: {
      duration: 400,
    },
    style: {
      fontFamily: 'Raleway',
      fontSize: '18px',
    },
    backgroundColor: 'transparent',
  },
  title: {
    text: 'Search for a last.fm user',
  },
  subtitle: {
    text: '',
  },
  xAxis: {
    title: {
      text: 'Hour of day'
    },
    lineColor: '#ccc',
    tickColor: '#ccc',
    categories: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '22', '22', '23'],
  },
  yAxis: {
    title: {
      text: 'Number of tracks',
    },
    allowDecimals: false,
    min: 0,
    softMax: 50, // Start with 50 as max to force 0-line to be at bottom
  },
  series: [{
    name: 'Tracks',
    color: '#dd453c',
    data: new Array(24).fill(0),
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
      }
    }]
  }
};

export default hightchartsConfig;

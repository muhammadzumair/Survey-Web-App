import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';


export default class DoughnutChart extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <Doughnut
        data={this.props.chartData}
        height={500}
        options={{
          title: {
            display: true,
            text: 'this is heading',
            fontSize: 25
          },
          legend: {
            display: true,
            position: "bottom"
          }
        }}
      />
    )
  }
}
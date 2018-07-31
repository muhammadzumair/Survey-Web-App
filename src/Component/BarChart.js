import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';


export default class BarChart extends Component {
    constructor(props) {
        super(props);
        
    }
    componentWillReceiveProps(nextProps){
        this.forceUpdate()
    }
    
    render() {
        return (
            <Bar
                data={this.props.chartData}
                height={350}
                options={
                    {

                        title: {
                            display: true,
                            text: this.props.heading,
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }

                    }}
            />
        )
    }
}
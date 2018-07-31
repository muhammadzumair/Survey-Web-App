import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';


export default class BarChart extends Component {
    constructor(props) {
        super(props);
        console.log('this.props In BarChart', this.props);
        this.state = {
            // chartData: {
            //     labels: this.props.labelsArray, //x-axis label array
            //     datasets: [
            //         {
            //             label: 'Happy',
            //             data: this.props.happyDataArray,
            //             backgroundColor:"gray"
            //         },
            //         {
            //             label: 'Moderate',
            //             data: this.props.moderateDataArray,
            //             backgroundColor: [
            //                 'brown',
            //             ]
            //         },
            //         {
            //             label: 'Angry',
            //             data: this.props.angryDataArray,
            //             backgroundColor: "yellow"
            //         }
            //     ]
            // }
        }
        

    }
    
    componentWillReceiveProps(nextProps){
        this.forceUpdate();
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
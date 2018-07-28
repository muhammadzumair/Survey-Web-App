import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';


export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['00', '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
                datasets: [
                    {
                        label: 'Happy',
                        data: [10],



                        backgroundColor:"gray"
                    },
                    {
                        label: 'Moderate',
                        data: [15],



                        backgroundColor: [
                            'brown',
                            
                           

                        ]
                    },
                    {
                        label: 'sad',
                        data: [25],



                        backgroundColor: "yellow"
                    }
                ]
            }
        }

    }
    render() {
        return (
            <Bar
                data={this.state.chartData}
                height="500"
                options={
                    {

                        title: {
                            display: true,
                            text: 'this is heading',
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
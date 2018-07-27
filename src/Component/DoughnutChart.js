import React from 'react';
import { Doughnut } from 'react-chartjs-2';


export default class DoughnutChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: this.props.chartData,
        }
    }

    

    render() {
        return(
            <Doughnut
                height={500}
                data={this.state.chartData}
                options={{
                    title: {
                        display: true,
                        text: 'Heading',
                        fontSize: 25

                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }} />
        )
    }
}
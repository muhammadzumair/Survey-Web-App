import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';


export default class DoughnutChart extends Component{
constructor(props){
    super(props);
    this.state={
        chartData:{
            labels: ['Happy', 'Moderate', 'Angry'],
            datasets:[
              {
                label:'Population',
                data:[
                  617594,
                  181045,
                  153060,
                  
                ],
                backgroundColor:[
                  '#4FAB56',
                  '#F99D2C',
                  '#E83E3B'
                  
                ]
              }
            ]
          }
    }

}
render(){
    return(
        <Doughnut
        data={this.state.chartData}
        height="500"
        options={{
            title:{
              display:true,
              text:'this is heading',
              fontSize:25
            },
            legend:{
              display:true,
              position:"bottom"
            }
          }}
        />
    )
}
}
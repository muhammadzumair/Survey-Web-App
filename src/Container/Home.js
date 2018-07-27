import React, { Component } from "react";
// import Navbar from "../../Component/Navbar";
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DoughnutChart from '../Component/DoughnutChart';
import BarChart from '../Component/BarChart';
import DBActions from '../store/action/DBActions'

class Home extends Component {

    constructor(props) {
        super(props);
        this.angryHourCount = [];
        this.moderatHourCount = [];
        this.happyHourCount = [];
        this.state = {
            chartData: {},
            angryHourCount: [],
            moderatHourCount : [],
            happyHourCount : []
        }
    }

    componentWillMount() {
        this.getChartData();
    }
    componentDidMount() {
        let obj = {

        }
        this.props.getHourlyData(obj);
        // this.calculateResponsesHourlyWise(this.props.hourlyData);
        // console.log('function called');
    }
    componentWillReceiveProps(nextPorps) {
        if (nextPorps) {
            this.calculateResponsesHourlyWise(nextPorps.hourlyData);
        }
    }
    calculateResponsesHourlyWise = (array) => {
        // alert('laksjdflskjdflkj')
        console.log('array: ', array);
        if (array) {
            array.map((data, i) => {
                console.log(data);
                let angryCount = 0, happyCount = 0, moderatCount = 0;
                let hour = new Date(data.timeStamp).getHours();
                if (data.userResponse === 'angry') {
                    angryCount = this.angryHourCount[hour];
                    if (angryCount == undefined) {
                        angryCount = 1
                    } else {
                        angryCount++;
                    }
                    this.angryHourCount[hour] = angryCount;
                }
                if (data.userResponse === 'moderat') {
                    moderatCount = this.moderatHourCount[hour];
                    if (moderatCount == undefined) {
                        moderatCount = 1
                    } else {
                        moderatCount++;
                    }
                    this.moderatHourCount[hour] = moderatCount;
                }
                if (data.userResponse === 'satisfied') {
                    happyCount = this.happyHourCount[hour];
                    if (happyCount == undefined) {
                        happyCount = 1
                    } else {
                        happyCount++;
                    }
                    this.happyHourCount[hour] = happyCount;
                }
            })
            console.log('angryArray: ', this.angryHourCount)
            console.log('happyArray: ', this.happyHourCount);
            console.log('moderatArray: ', this.moderatHourCount);
        }
    }

    getChartData = () => {
        // Ajax calls here
        this.setState({
            chartData: {
                labels: ['Boston', 'Worcester', 'Springfield'],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            617594,
                            181045,
                            153060,

                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',

                        ]
                    }
                ]
            }
        });
    }
    render() {
        return (
            <div>
                <Grid container justify='center' direction={'row'}>
                    <Grid item md={4} xs={10} style={{ padding: 15 }}>
                        <Card >
                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <img src={require('./assets/happy.png')} height='125px' width='125px' />
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="caption" gutterBottom>
                                        Happy Click
                                    </Typography>
                                    <Typography style={{ textAlign: 'center' }} variant="display2" gutterBottom>
                                        0
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={10} style={{ padding: 15 }}>
                        <Card >
                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <img src={require('./assets/moderate.png')} height='125px' width='125px' />
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="caption" gutterBottom>
                                        Moderate Click
                                    </Typography>
                                    <Typography style={{ textAlign: 'center' }} variant="display2" gutterBottom>
                                        0
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={10} style={{ padding: 15 }}>
                        <Card >
                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <img src={require('./assets/__sad.png')} height='125px' width='125px' />
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="caption" gutterBottom>
                                        Sad Click
                                    </Typography>
                                    <Typography style={{ textAlign: 'center' }} variant="display2" gutterBottom>
                                        0
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container justify='center' direction={'row'}>
                    <Grid item md={8} xs={10} style={{ padding: 15 }}>
                        <Card >
                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={10} style={{ padding: 15 }}>
                        <Card >
                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <DoughnutChart chartData={this.state.chartData} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container justify='center' direction={'row'}>
                    <Grid item md={10} xs={10} style={{ padding: 15 }}>
                        <BarChart />
                    </Grid>
                </Grid>
            </div>
        )
    }

}

const mapStateToPorps = (state) => {
    console.log('state: ', state)
    return {
        hourlyData: state.dbReducer.hourlyData
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        getHourlyData: (obj) => dispatch(DBActions.getHourlyData(obj))
    }
}
export default connect(mapStateToPorps, mapDispatchToPorps)(Home)
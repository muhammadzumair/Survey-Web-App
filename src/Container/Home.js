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
import DBActions from '../store/action/DBActions';
import FirebaseDB from '../store/Firebase/firebaseDB';

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.angryCount = 0;
        this.angryHourCount = [];
        this.moderateCount = 0;
        this.moderateHourCount = [];
        this.happyCount = 0;
        this.happyHourCount = [];
        this.datesArray = [];
        this.angryWeekCount = 0;
        this.happyWeekCount = 0;
        this.moderatWeekCount = 0;
        this.angryWeekCountArray = [];
        this.happyWeekCountArray = [];
        this.moderatWeekCountArray = [];
        this.iteration = 0
    }

    componentDidMount() {
        this.props.getRealtimeData('31-07-2018', 'Tariq Road');
        let date = this.getMonday('24,2018 july');
        let month = date.getMonth() + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        let fullDate = `${date.getDate()}-${month}-${date.getFullYear()}`;
        this.datesArray[0] = fullDate;
        for (let i = 1; i <= 6; i++) {
            let date = this.getMonday('24,2018 july');
            date = date.addDays(i);
            let month = date.getMonth() + 1;
            month = month.toString().length > 1 ? month : `0${month}`;
            let fullDate = `${date.getDate()}-${month}-${date.getFullYear()}`;
            this.datesArray.push(fullDate);
        }
        for (let i = 0; i < this.datesArray.length; i++) {
            this.props.getWeeklyData(this.datesArray[i], 'Tariq Road');
        }
    }
    componentWillReceiveProps(nextProps) {
        this.iteration++;
        if (nextProps) {
            if (this.iteration == 7) {
                this.calculateResponsesWeeklyWise(nextProps.weeklyData);
            }
        }
    }
    calculateResponsesWeeklyWise = (array) => {
        if (array !== undefined) {
            array.forEach((data, i) => {
                let weekDay = new Date(data.timeStamp).getDay();
                this.happyWeekCount = this.happyWeekCountArray[weekDay];
                this.moderateWeekCount = this.moderatWeekCountArray[weekDay];
                this.angryWeekCount = this.angryWeekCountArray[weekDay];
                if (data.userResponse === 'satisfied') {
                    if (this.happyWeekCount) {
                        this.happyWeekCount++;
                    } else {
                        this.happyWeekCount = 1
                    }
                    this.happyWeekCountArray[weekDay] = this.happyWeekCount;
                }
                if (data.userResponse === 'angry') {
                    if (this.angryWeekCount) {
                        this.angryWeekCount++;
                    } else {
                        this.angryWeekCount = 1
                    }
                    this.angryWeekCountArray[weekDay] = this.angryWeekCount;
                }
                if (data.userResponse === 'moderat') {
                    if (this.moderateWeekCount) {
                        this.moderateWeekCount++;
                    } else {
                        this.moderateWeekCount = 1;
                    }
                    this.moderatWeekCountArray[weekDay] = this.moderateWeekCount;
                }
            });
        }
    }
    getMonday = (d) => {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }
    calculateResponsesHourlyWise = (array) => {
        if (array) {
            array.map(data => {
                let timeHours = new Date(data.timeStamp).getHours();
                this.angryCount = this.angryHourCount[timeHours]
                this.moderateCount = this.moderateHourCount[timeHours]
                this.happyCount = this.happyHourCount[timeHours]
                if (data.userResponse === "angry") {
                    if (this.angryCount) {
                        this.angryCount++;
                    }
                    else {
                        this.angryCount = 1;
                    }
                    this.angryHourCount[timeHours] = this.angryCount
                }
                if (data.userResponse === "moderat") {
                    if (this.moderateCount) {
                        this.moderateCount++;
                    }
                    else {
                        this.moderateCount = 1;
                    }
                    this.moderateHourCount[timeHours] = this.moderateCount
                }
                if (data.userResponse === "satisfied") {
                    if (this.happyCount) {
                        this.happyCount++
                    }
                    else {
                        this.happyCount = 1
                    }
                    this.happyHourCount[timeHours] = this.happyCount
                }
            })
        }
    }
    render() {
        return (
            <div>
                <Grid container direction={'row'} justify="center"  >
                    <Grid item md={4} xs={10} style={{ padding: 15 }}  >
                        <Card >
                            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                <img src={require('./assets/happy.png')} height='125px' width='125px' />
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
                                    <Typography variant="caption" gutterBottom>
                                        Happy Clicks
                                </Typography>
                                    <Typography variant="display2" style={{ textAlign: "center" }} gutterBottom>
                                        0
                                </Typography>
                                </div>
                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid item md={4} xs={10} style={{ padding: 15 }}>
                        <Card >
                            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                <img src={require('./assets/moderate.png')} height='125px' width='125px' />
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
                                    <Typography variant="caption" gutterBottom>
                                        Moderate Clicks
                        </Typography>
                                    <Typography variant="display2" style={{ textAlign: "center" }} gutterBottom>
                                        0
                        </Typography>
                                </div>
                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid item md={4} xs={10} style={{ padding: 15 }}>
                        <Card >
                            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                <img src={require('./assets/__sad.png')} height='125px' width='125px' />
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} >
                                    <Typography variant="caption" gutterBottom>
                                        Angry Clicks
                        </Typography>
                                    <Typography variant="display2" style={{ textAlign: "center" }} gutterBottom>
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
                                <DoughnutChart />
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
        hourlyData: state.dbReducer.hourlyData,
        weeklyData: state.dbReducer.weeklyData,
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        getHourlyData: (obj) => dispatch(DBActions.getHourlyData(obj)),
        getWeeklyData: (date, branch) => dispatch(DBActions.getWeeklyData(date, branch)),
        getRealtimeData: (date, branch) => dispatch(DBActions.getRealtimeData(date,branch))
    }
}
export default connect(mapStateToPorps, mapDispatchToPorps)(Home);
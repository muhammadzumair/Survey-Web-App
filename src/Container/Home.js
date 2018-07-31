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
import FirebaseDB from "../store/Firebase/firebaseDB";
import { concat } from "rxjs/observable/concat";

class Home extends Component {

    constructor(props) {
        super(props);
        this.clicksObject = {};
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
        this.iteration = 0;

        this.state = { countClicks: {}, angryCount: 0, happyCount: 0, moderateCount: 0, angryHourCountArray: [], moderateHourCountArray: [], happyHourCountArray: [], angryWeekCountArray: [], happyWeekCountArray: [], moderateWeekCountArray: [] }
    }

    componentDidMount() {
        this.props.getHourlyData({ date: "31-07-2018", branch: "Tariq Road" })

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
    shouldComponentUpdate(newProps, newState) {
        console.log("***recv props****", newProps);
        return true;
    }
    componentWillReceiveProps(nextProps) {
        this.iteration++;

        if (nextProps.state) {
            if (this.iteration == 7) {
                this.calculateResponsesWeeklyWise(nextProps.weeklyData);
                this.calculateResponsesHourlyWise(nextProps.state.hourlyData);
                this.dailyClicksCount(nextProps.state.hourlyData)
                this.props.getHourlyDataFlagFalse();
            }
            if (this.iteration > 7 && nextProps.hourlyDataFlag) {
                console.log('****iteration****', this.iteration);
                this.calculateResponsesHourlyWise(nextProps.state.hourlyData);
                this.dailyClicksCount(nextProps.state.hourlyData)
                this.props.getHourlyDataFlagFalse()
            }
        }
    }
    dailyClicksCount = (array) => {

        if (array) {
            array.forEach(data => {
                if (data.userResponse == "satisfied") {
                    if (this.clicksObject["happy"]) {
                        this.clicksObject["happy"]++
                    }
                    else {
                        this.clicksObject["happy"] = 1;
                    }
                }
                if (data.userResponse == "angry") {
                    if (this.clicksObject["angry"]) {
                        this.clicksObject["angry"]++;
                    }
                    else {
                        this.clicksObject["angry"] = 1
                    }
                }
                if (data.userResponse == "moderat") {
                    if (this.clicksObject["moderate"]) {
                        this.clicksObject["moderate"]++;
                    }
                    else {
                        this.clicksObject["moderate"] = 1;
                    }
                }
            });
            this.setState({ countClicks: this.clicksObject }, () => { this.clicksObject = {} })
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
            this.setState({ angryWeekCountArray: this.angryWeekCountArray, moderateWeekCountArray: this.moderatWeekCountArray, happyWeekCountArray: this.happyWeekCountArray }
            )
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
                this.setState({ moderateHourCountArray: [...this.moderateHourCount], angryHourCountArray: [...this.angryHourCount], happyHourCountArray: [...this.happyHourCount] }, () => {
                    this.angryCount = 0;
                    this.happyCount = 0;
                    this.moderateCount = 0;
                    this.angryHourCount = [];
                    this.moderateHourCount = [];
                    this.happyHourCount = [];
                })
            });
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
                                        {this.state.countClicks.happy}
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
                                        {this.state.countClicks.moderate}
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
                                        {this.state.countClicks.angry}
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
                                <BarChart
                                    heading={"Hourly Data"}
                                    chartData={
                                        {
                                            labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
                                            datasets: [
                                                {
                                                    label: 'Happy',
                                                    data: this.state.happyHourCountArray,



                                                    backgroundColor: "#4FAB56"
                                                },
                                                {
                                                    label: 'Moderate',
                                                    data: this.state.moderateHourCountArray,



                                                    backgroundColor: '#F99D2C'
                                                },
                                                {
                                                    label: 'sad',
                                                    data: this.state.angryHourCountArray,



                                                    backgroundColor: "#E83E3B"
                                                }
                                            ]
                                        }}






                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={10} style={{ padding: 15 }}>
                        <Card >
                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <DoughnutChart
                                    chartData={
                                        {
                                            labels: ['Happy', 'Moderate', 'Angry'],
                                            datasets: [
                                                {
                                                    label: 'Population',
                                                    data: [
                                                        this.state.countClicks.happy,
                                                        this.state.countClicks.moderate,
                                                        this.state.countClicks.angry,

                                                    ],
                                                    backgroundColor: [
                                                        '#4FAB56',
                                                        '#F99D2C',
                                                        '#E83E3B'

                                                    ]
                                                }
                                            ]
                                        }
                                    }



                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container justify='center' direction={'row'}>
                    <Grid item md={10} xs={10} style={{ padding: 15 }}>
                        <BarChart
                            heading={"Weekly Data"}
                            chartData={
                                {
                                    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                    datasets: [
                                        {
                                            label: 'Happy',
                                            data: this.state.happyWeekCountArray,



                                            backgroundColor: "gray"
                                        },
                                        {
                                            label: 'Moderate',
                                            data: this.state.moderateWeekCountArray,



                                            backgroundColor: 'brown'
                                        },
                                        {
                                            label: 'sad',
                                            data: this.state.angryWeekCountArray,



                                            backgroundColor: "yellow"
                                        }
                                    ]
                                }}






                        />
                    </Grid>
                </Grid>
            </div>
        )
    }

}
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


const mapStateToPorps = (state) => {

    return {
        state: state.dbReducer,
        weeklyData: state.dbReducer.weeklyData,
        hourlyDataFlag: state.dbReducer.hourlyDataFlag
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        getHourlyData: (obj) => dispatch(DBActions.getHourlyData(obj)),
        getWeeklyData: (date, branch) => dispatch(DBActions.getWeeklyData(date, branch)),
        getRealtimeData: (date, branch) => dispatch(DBActions.getRealTimeData(date, branch)),
        getHourlyDataFlagFalse: () => dispatch(DBActions.getHourlyDataFlagFalse())
    }
}
export default connect(mapStateToPorps, mapDispatchToPorps)(Home);
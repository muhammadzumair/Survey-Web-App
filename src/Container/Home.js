import React, { Component } from "react";
import Navbar from "../Component/Navbar";
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DoughnutChart from '../Component/DoughnutChart';
import BarChart from '../Component/BarChart';
import DBActions from '../store/action/DBActions';

class Home extends Component {

    constructor(props) {
        super(props);
        this.angryHourCountArray = [];
        this.moderateHourCountArray = [];
        this.happyHourCountArray = [];
        this.datesArray = [];
        this.angryWeekCountArray = [];
        this.happyWeekCountArray = [];
        this.moderatWeekCountArray = [];
        this.moderateCount = 0;
        this.angryCount = 0;
        this.happyCount = 0;
        this.angryWeekCount = 0;
        this.happyWeekCount = 0;
        this.moderatWeekCount = 0;
        this.iteration = 0,
            this.clicksObject = {};

        this.state = {
            angryHourCountArray: [],
            happyHourCountArray: [],
            moderateHourCountArray: [],
            angryWeekCountArray: [],
            happyWeekCountArray: [],
            moderatWeekCountArray: [],
            iteration: 0,
            flag: true,
            countClicks: {},
            selectedBranch: 'select branch'
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setCurrentBranch(event.target.value);
        this.iteration = 0;
        this.props.getHourlyData({ date: this.props.currentDate, branch: event.target.value });
        this.props.getRealtimeData(this.props.currentDate, event.target.value);
        let date = this.getMonday(this.dateFormatter(this.props.currentDate));
        let month = date.getMonth() + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        let day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate()
        let fullDate = `${day}-${month}-${date.getFullYear()}`;
        this.datesArray[0] = fullDate;
        for (let i = 1; i <= 6; i++) {
            let date = this.getMonday(this.dateFormatter(this.props.currentDate));
            date = date.addDays(i);
            let month = date.getMonth() + 1;
            month = month.toString().length > 1 ? month : `0${month}`;
            let day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate()
            let fullDate = `${day}-${month}-${date.getFullYear()}`;
            this.datesArray.push(fullDate);

        }
        for (let i = 0; i < this.datesArray.length; i++) {
            this.props.getWeeklyData(this.datesArray[i], 'Tariq Road');
        }
        console.log("///////dates array //////", this.datesArray)
    };
    componentDidMount() {

    }
    shouldComponentUpdate(newProps, newState) {
        console.log("***recv props****", newProps);
        return true;
    }
    componentWillReceiveProps(nextProps) {
        this.iteration++;

        if (nextProps.state) {
            if (this.iteration == 7) {
                this.calculateResponsesWeeklyWise(nextProps.state.weeklyData);
                this.calculateResponsesHourlyWise(nextProps.state.hourlyData);
                this.dailyClicksCount(nextProps.state.hourlyData);
                this.props.hourlyDataFlagFalse();
            }
            if (this.iteration > 7 && nextProps.state.hourlyDataFlag) {
                this.calculateResponsesHourlyWise(nextProps.state.hourlyData);
                this.dailyClicksCount(nextProps.state.hourlyData);
                this.props.hourlyDataFlagFalse();
            }
        }
    }
    dateFormatter = (date) => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let day = date.slice(0, 2);
        let month = date.slice(3, 5)
        let year = date.slice(6, 11);
        return `${day},${months[Number(month - 1)]} ${year}`;
    }
    dailyClicksCount = (array) => {
        if (array) {
            array.forEach((data, i) => {
                let angryCount = this.clicksObject['angry'];
                let happyCount = this.clicksObject['happy'];
                let moderatCount = this.clicksObject['moderat'];
                if (data.userResponse === 'angry') {
                    if (angryCount) {
                        angryCount++;
                    } else {
                        angryCount = 1
                    }
                    this.clicksObject['angry'] = angryCount;
                }
                if (data.userResponse === 'satisfied') {
                    if (happyCount) {
                        happyCount++;
                    } else {
                        happyCount = 1
                    }
                    this.clicksObject['happy'] = happyCount;
                }
                if (data.userResponse === 'moderat') {
                    if (moderatCount) {
                        moderatCount++;
                    } else {
                        moderatCount = 1
                    }
                    this.clicksObject['moderat'] = moderatCount;
                }
            });
            this.setState({ countClicks: this.clicksObject }, function () {
                this.clicksObject = {};
            });
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
            this.setState({
                moderatWeekCountArray: [...this.moderatWeekCountArray],
                happyWeekCountArray: [...this.happyWeekCountArray],
                angryWeekCountArray: [...this.angryWeekCountArray]
            }, function () {
                this.moderatWeekCountArray = [];
                this.happyWeekCountArray = [];
                this.angryWeekCountArray = [];
                this.moderateWeekCount = 0;
                this.angryWeekCount = 0;
                this.happyWeekCount = 0
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    getMonday = (d) => {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }
    calculateResponsesHourlyWise = (array) => {
        if (array) {
            array.forEach((data, i) => {
                let timeHours = new Date(data.timeStamp).getHours();
                this.angryCount = this.angryHourCountArray[timeHours]
                this.moderateCount = this.moderateHourCountArray[timeHours]
                this.happyCount = this.happyHourCountArray[timeHours]
                if (data.userResponse === "angry") {
                    if (this.angryCount) {
                        this.angryCount++;
                    }
                    else {
                        this.angryCount = 1;
                    }
                    this.angryHourCountArray[timeHours] = this.angryCount
                }
                if (data.userResponse === "moderat") {
                    if (this.moderateCount) {
                        this.moderateCount++;
                    }
                    else {
                        this.moderateCount = 1;
                    }
                    this.moderateHourCountArray[timeHours] = this.moderateCount
                }
                if (data.userResponse === "satisfied") {
                    if (this.happyCount) {
                        this.happyCount++
                    }
                    else {
                        this.happyCount = 1
                    }
                    this.happyHourCountArray[timeHours] = this.happyCount
                }
            });
            this.setState({
                happyHourCountArray: [...this.happyHourCountArray],
                moderateHourCountArray: [...this.moderateHourCountArray],
                angryHourCountArray: [...this.angryHourCountArray]
            },
                function () {
                    this.happyHourCountArray = [];
                    this.moderateHourCountArray = [];
                    this.angryHourCountArray = [];
                    this.moderateCount = 0;
                    this.angryCount = 0;
                    this.happyCount = 0;
                });
        }
    }
    render() {
        return (
            <Navbar changeHandler={(event) => this.handleChange(event)} selectedBranch={this.state.selectedBranch}>

                {
                    this.state.selectedBranch === "select branch" ? <div><h1>Please Select Your Branch</h1></div> :
                        <div style={{ backgroundColor: "#f5f5f5" }} >
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
                                                    {this.state.countClicks['happy']}
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
                                                    {this.state.countClicks['moderat']}
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
                                                    {this.state.countClicks['angry']}
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
                                            <BarChart heading={"Hourly Response"}
                                                chartData={{
                                                    labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], //x-axis label array
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
                                                            label: 'Angry',
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
                                                heading={"Clicks Response"}
                                                chartData={{
                                                    labels: ['Happy', 'Moderate', 'Angry'],
                                                    datasets: [
                                                        {
                                                            label: 'Population',
                                                            data: [
                                                                this.state.countClicks['happy'],
                                                                this.state.countClicks['moderat'],
                                                                this.state.countClicks['angry']
                                                            ],
                                                            backgroundColor: [
                                                                '#4FAB56',
                                                                '#F99D2C',
                                                                '#E83E3B'

                                                            ]
                                                        }
                                                    ]
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container justify='center' direction={'row'}>
                                <Grid item md={10} xs={10} style={{ padding: 15 }}>
                                    <Card >
                                        <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <BarChart heading={"Weekly Response"}
                                                chartData={{
                                                    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], //x-axis label array
                                                    datasets: [
                                                        {
                                                            label: 'Happy',
                                                            data: this.state.happyWeekCountArray,
                                                            backgroundColor: "#4FAB56"
                                                        },
                                                        {
                                                            label: 'Moderate',
                                                            data: this.state.moderatWeekCountArray,
                                                            backgroundColor: '#F99D2C'
                                                        },
                                                        {
                                                            label: 'Angry',
                                                            data: this.state.angryWeekCountArray,
                                                            backgroundColor: "#E83E3B"
                                                        }
                                                    ]
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                }
            </Navbar>
        )
    }

}
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


const mapStateToPorps = (state) => {
    console.log('newState: ', state);
    return {
        state: state.dbReducer,
        iteration: state.dbReducer.iteration,
        currentDate: state.dbReducer.currentDate
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        getHourlyData: (obj) => dispatch(DBActions.getHourlyData(obj)),
        getWeeklyData: (date, branch) => dispatch(DBActions.getWeeklyData(date, branch)),
        getRealtimeData: (date, branch) => dispatch(DBActions.getRealTimeData(date, branch)),
        hourlyDataFlagFalse: () => dispatch(DBActions.hourlyDataFlagFalse()),
        setCurrentBranch: (branch) => dispatch(DBActions.setCurrentBranch(branch))
    }
}
export default connect(mapStateToPorps, mapDispatchToPorps)(Home);
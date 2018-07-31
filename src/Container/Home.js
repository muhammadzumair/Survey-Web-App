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
        this.angryCount = 0;
        this.angryHourCount = [];
        this.moderateCount = 0;
        this.moderateHourCount = [];
        this.happyCount = 0;
        this.happyHourCount = [];
        this.dateArray = [];
        this.formattedDateArray = [];
        this.angryWeekCount = 0;
        this.happyWeekCount = 0;
        this.moderateWeekCount = 0;
        this.angryWeekCountArray = [];
        this.happyWeekCountArray = [];
        this.moderateWeekCountArray = [];
        this.countProps=0;
    }

    componentDidMount() {
        // this.props.getHourlyData("24-07-2018", "Tariq Road");

        // this.dateArray[0] = this.getMonday("24,2018 july");
        // for (let i = 1; i <= 6; i++) {
        //     this.dateArray.push(this.dateArray[0].addDays(i))

        // }
        // for (let i = 0; i < this.dateArray.length; i++) {
        //     let date = this.dateArray[i].getDate();
        //     let month = (this.dateArray[i].getMonth().toString().length > 1) ? this.dateArray[i].getMonth() + 1 : `0${this.dateArray[i].getMonth() + 1}`;
        //     let year = this.dateArray[i].getFullYear();
        //     let formattedDate = date + "-" + month + "-" + year;
        //     this.formattedDateArray.push(formattedDate);
        // }
        // for (let i = 0; i < this.formattedDateArray.length; i++) {
        //     this.props.getWeeklyData(this.formattedDateArray[i], "Tariq Road")
        // }
        // console.log(this.formattedDateArray)
        this.props.getRealTimeData("31-07-2018","Tariq Road");
        
    }


    getMonday = (d) => {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    componentWillReceiveProps(nextProps) {
        this.countProps+=1;
        
        if (nextProps) {
            // this.calculateResponsesHourlyWise(nextProps.hourlyData);
        }
        if(this.countProps==7)
        this.calculateResponsesWeeklyWise(nextProps.weeklyData)
        
    }
    calculateResponsesWeeklyWise = (array) => {
        
        if (array) {
            array.forEach(data => {
                
                let weekDay = new Date(data.timeStamp).getDay();
                this.angryWeekCount = this.angryWeekCountArray[weekDay];
                this.happyWeekCount = this.happyWeekCountArray[weekDay];
                this.moderateWeekCount = this.moderateWeekCountArray[weekDay];
                if (data.userResponse === "angry") {
                    if (this.angryWeekCount) {
                        this.angryWeekCount++;
                    }
                    else {
                        this.angryWeekCount = 1
                    }
                    this.angryWeekCountArray[weekDay] = this.angryWeekCount;
                }
                if (data.userResponse === "moderat") {
                    if (this.moderateWeekCount) {
                        this.moderateWeekCount++;
                    }
                    else {
                        this.moderateWeekCount = 1;
                    }
                    this.moderateWeekCountArray[weekDay] = this.moderateWeekCount;
                }
                if (data.userResponse === "satisfied") {
                    if(this.happyWeekCount){
                        this.happyWeekCount++;
                    }
                    else{
                        this.happyWeekCount=1
                    }
                    this.happyWeekCountArray[weekDay]=this.happyWeekCount
                }
            })
            
        }
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
                        this.angryHourCount[timeHours] = this.angryCount
                    }
                    else {
                        this.angryCount = 1;
                        this.angryHourCount[timeHours] = this.angryCount
                    }
                }
                if (data.userResponse === "moderat") {
                    if (this.moderateCount) {

                        this.moderateCount++;
                        this.moderateHourCount[timeHours] = this.moderateCount
                    }
                    else {
                        this.moderateCount = 1;
                        this.moderateHourCount[timeHours] = this.moderateCount

                    }
                }
                if (data.userResponse === "satisfied") {
                    if (this.happyCount) {

                        this.happyCount++
                        this.happyHourCount[timeHours] = this.happyCount
                    }
                    else {
                        this.happyCount = 1
                        this.happyHourCount[timeHours] = this.happyCount
                    }
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
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


const mapStateToPorps = (state) => {
    
    return {
        hourlyData: state.dbReducer.hourlyData,
        weeklyData: state.dbReducer.weeklyData
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        getHourlyData: (obj) => dispatch(DBActions.getHourlyData(obj)),
        getWeeklyData: (date, branch) => dispatch(DBActions.getWeeklyData(date, branch)),
        getRealTimeData:(date,branch)=> dispatch(DBActions.getRealTimeData(date,branch)),
    }
}
export default connect(mapStateToPorps, mapDispatchToPorps)(Home)

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
        this.angryCount = 0;
        this.angryHourCount = [];
        this.moderateCount = 0;
        this.moderateHourCount = [];
        this.happyCount = 0;
        this.happyHourCount = [];
    }

    componentDidMount() {
        this.props.getHourlyData("24-07-2018", "Tariq Road");

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.calculateResponsesHourlyWise(nextProps.hourlyData)
        }
    }
    calculateResponsesHourlyWise = (array) => {
        console.log("in function")
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
            console.log(this.happyHourCount, this.angryHourCount, this.moderateHourCount)
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
                <Grid container direction={'row'} justify="center"  >
                    <Grid item md={8} xs={10} style={{ padding: 15 }}  >
                        <Card >
                            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                <BarChart />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={10} style={{ padding: 15 }}  >
                        <Card >
                            <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                <DoughnutChart />
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
        hourlyData: state.dbReducer.hourlyData
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        getHourlyData: (obj) => dispatch(DBActions.getHourlyData(obj))
    }
}
export default connect(mapStateToPorps, mapDispatchToPorps)(Home)

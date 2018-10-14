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
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Progress } from 'semantic-ui-react';
import Location from '@material-ui/icons/LocationOn';
import AudioPlayer from '../Component/AudioPlayer';
import Play from '@material-ui/icons/PlayCircleFilled';
import Pause from '@material-ui/icons/PauseCircleFilled';
import Loader from 'react-loader-spinner';
import 'semantic-ui-css/semantic.min.css';
import './ReasonAnalytics.css';

const Images = {
    'satisfied': './assets/happy.png',
    'moderat': './assets/moderate.png',
    'angry': './assets/__sad.png'

}
function timeAndDateformatter(dateStr) {
    let dateStr1 = new Date(dateStr).toISOString();
    let date = dateStr1.slice(0, dateStr1.indexOf('T'));
    let time = dateStr1.slice(dateStr1.indexOf('T') + 1, dateStr1.indexOf('.'));
    time = time.split(':'); // convert to array
    console.log('time: ', time);
    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
        timeValue = "" + hours;
    } else if (hours > 12) {
        timeValue = "" + (hours - 12);
    } else if (hours == 0) {
        timeValue = "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
    return date + " " + timeValue;
}


class Monthly extends Component {

    constructor(props) {
        super(props);
        this.angryHourCountArray = [];
        this.moderateHourCountArray = [];
        this.happyHourCountArray = [];
        this.datesArray = [];
        this.angryWeekCountArray = [];
        this.happyWeekCountArray = [];
        this.moderatWeekCountArray = [];
        this.angryMonthCountArray = [];
        this.happyMonthCountArray = [];
        this.moderatMonthCountArray = [];
        this.angryMonthCount = 0;
        this.happyMonthCount = 0;
        this.moderatMonthCount = 0;
        this.moderateCount = 0;
        this.angryCount = 0;
        this.happyCount = 0;
        this.angryWeekCount = 0;
        this.happyWeekCount = 0;
        this.moderatWeekCount = 0;
        this.iteration = 0;
        this.clicksObject = {};
        this.lastDate = 0;
        this.responseArray = [];
        this.angryReasonsCount = {};


        this.state = {
            angryHourCountArray: [],
            happyHourCountArray: [],
            moderateHourCountArray: [],
            angryWeekCountArray: [],
            happyWeekCountArray: [],
            moderatWeekCountArray: [],
            angryMonthCountArray: [],
            happyMonthCountArray: [],
            moderatMonthCountArray: [],
            iteration: 0,
            flag: true,
            countClicks: {},
            selectedBranch: this.props.selectedBranch,
            datesArray: [],
            responseArray: [],
            isProgress: false,
            responseArrayIterations: 10,
            stopPaging: false,
            angryReasonsCount: {
                'Waiting Time': 0,
                'Bad Service': 0,
                'Enviroment': 0,
                'Attitude': 0
            }
        }
    }

    dateFormatter = (date) => {
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            formatedDate = `${date.slice(0, 2)},${month[Number(date.slice(3, 5)) - 1]} ${date.slice(6, 10)}`;
        return formatedDate;
    }

    getMonthlyDatesArray = (newDate, branch) => {
        console.log('current date from ')
        let date = new Date(this.dateFormatter(newDate)),
            firstDayObj = new Date(date.getFullYear(), date.getMonth(), 1),
            lastDayObj = new Date(date.getFullYear(), date.getMonth() + 1, 0),
            datesArray = [],
            firstDay = firstDayObj.getDate(),
            lastDay = lastDayObj.getDate();
        this.lastDate = lastDay;
        for (let i = firstDay; i <= lastDay; i++) {
            let day = i.toString().length === 1 ? ('0' + i.toString()) : i;
            let month = firstDayObj.getMonth() + 1;
            month = month.toString().length > 1 ? month : `0${month}`;
            let fullDate = `${day}-${month}-${firstDayObj.getFullYear()}`;
            this.props.getDataDateWise(fullDate, branch);
            datesArray.push(fullDate);
        }
        this.setState({ datesArray })
        return datesArray;
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.props.currentDate);
        this.props.setCurrentBranch(event.target.value);
        this.iteration = 0;
        this.getMonthlyDatesArray(this.props.currentDate, event.target.value);
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
            let day = date.getDate().toString().length === 1 ? ('0' + date.getDate().toString()) : date.getDate();
            let month = date.getMonth() + 1;
            month = month.toString().length > 1 ? month : `0${month}`;
            let fullDate = `${day}-${month}-${date.getFullYear()}`;
            this.datesArray.push(fullDate);

        }
        for (let i = 0; i < this.datesArray.length; i++) {
            this.props.getWeeklyData(this.datesArray[i], event.target.value);
        }
        this.datesArray = [];
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.callPaging);
    }

    componentDidMount() {
        this.props.clearMonthlyArray();
        window.addEventListener('scroll', this.callPaging);
        // this.setState({ [event.target.name]: event.target.value });
        if (this.props.selectedBranch !== 'select branch') {
            console.log(this.props.currentDate);
            this.props.setCurrentBranch(this.props.selectedBranch);
            this.iteration = 0;
            this.getMonthlyDatesArray(this.props.currentDate, this.props.selectedBranch);
            // this.props.getHourlyData({ date: this.props.currentDate, branch: this.props.selectedBranch });
            this.props.getRealtimeData(this.props.currentDate, this.props.selectedBranch);
            let date = this.getMonday(this.dateFormatter(this.props.currentDate));
            let month = date.getMonth() + 1;
            month = month.toString().length > 1 ? month : `0${month}`;
            let day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate()
            let fullDate = `${day}-${month}-${date.getFullYear()}`;
            this.datesArray[0] = fullDate;
            for (let i = 1; i <= 6; i++) {
                let date = this.getMonday(this.dateFormatter(this.props.currentDate));
                date = date.addDays(i);
                let day = date.getDate().toString().length === 1 ? ('0' + date.getDate().toString()) : date.getDate();
                let month = date.getMonth() + 1;
                month = month.toString().length > 1 ? month : `0${month}`;
                let fullDate = `${day}-${month}-${date.getFullYear()}`;
                this.datesArray.push(fullDate);

            }
            for (let i = 0; i < this.datesArray.length; i++) {
                this.props.getWeeklyData(this.datesArray[i], this.props.selectedBranch);
                console.log("this.datesArray[i]: ", this.datesArray[i]);
            }
            this.datesArray = [];
        }
        // console.log("monthly dates Array: ", this.getMonthlyDatesArray(this.props.currentDate));
    }
    // shouldComponentUpdate(newProps, newState) {
    //     console.log("***recv props****", newProps);
    //     return true;
    // }
    componentWillReceiveProps(nextProps) {
        this.iteration++;

        if (nextProps.state) {
            if (this.iteration == 7) {
                this.calculateResponsesHourlyWise(nextProps.state.hourlyData);
                this.dailyClicksCount(nextProps.state.hourlyData);
                this.props.hourlyDataFlagFalse();
                this.calculateResponsesWeeklyWise(nextProps.state.weeklyData);
            }
            if (this.iteration > 7 && nextProps.state.hourlyDataFlag) {
                this.calculateResponsesHourlyWise(nextProps.state.hourlyData);
                this.dailyClicksCount(nextProps.state.hourlyData);
                this.props.hourlyDataFlagFalse();
            }
            console.log('iterations: ', this.iteration, ' last date: ', this.lastDate);
            if (this.iteration === this.lastDate + 12) {
                console.log('start calculations +12: ')
                this.calculateResponsesMonthlyWise(nextProps.state.dateWiseDataArray);
            }
            if (this.iteration === this.lastDate + 2) {
                console.log('start calculations +2: ')
                this.calculateResponsesMonthlyWise(nextProps.state.dateWiseDataArray);
            }
        }
        console.log('cal iteration: ', this.iteration);

    }
    dateFormatter = (date) => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let day = date.slice(0, 2);
        let month = date.slice(3, 5)
        let year = date.slice(6, 11);
        return `${day},${months[Number(month - 1)]} ${year}`;
    }
    dailyClicksCount = (array) => {
        // if (array) {
        //     array.forEach((data, i) => {
        //         let angryCount = this.clicksObject['angry'];
        //         let happyCount = this.clicksObject['happy'];
        //         let moderatCount = this.clicksObject['moderat'];
        //         if (data.userResponse === 'angry') {
        //             if (angryCount) {
        //                 angryCount++;
        //             } else {
        //                 angryCount = 1
        //             }
        //             this.clicksObject['angry'] = angryCount;
        //         }
        //         if (data.userResponse === 'satisfied') {
        //             if (happyCount) {
        //                 happyCount++;
        //             } else {
        //                 happyCount = 1
        //             }
        //             this.clicksObject['happy'] = happyCount;
        //         }
        //         if (data.userResponse === 'moderat') {
        //             if (moderatCount) {
        //                 moderatCount++;
        //             } else {
        //                 moderatCount = 1
        //             }
        //             this.clicksObject['moderat'] = moderatCount;
        //         }
        //     });
        //     this.setState({ countClicks: this.clicksObject }, function () {
        //         this.clicksObject = {};
        //     });
        // }
    }
    calculateResponsesWeeklyWise = (array) => {
        // if (array !== undefined) {
        //     array.forEach((data, i) => {
        //         let angryCount = this.clicksObject['angry'];
        //         let happyCount = this.clicksObject['happy'];
        //         let moderatCount = this.clicksObject['moderat'];
        //         let weekDay = new Date(data.timeStamp).getDay();
        //         this.happyWeekCount = this.happyWeekCountArray[weekDay];
        //         this.moderateWeekCount = this.moderatWeekCountArray[weekDay];
        //         this.angryWeekCount = this.angryWeekCountArray[weekDay];
        //         if (data.userResponse === 'satisfied') {
        //             if (this.happyWeekCount) {
        //                 this.happyWeekCount++;
        //             } else {
        //                 this.happyWeekCount = 1
        //             }
        //             this.happyWeekCountArray[weekDay] = this.happyWeekCount;
        //             if (happyCount) {
        //                 happyCount++;
        //             } else {
        //                 happyCount = 1
        //             }
        //             this.clicksObject['happy'] = happyCount;


        //             let index = 0, flag = false;
        //             for (let i = 0; i <= this.responseArray.length; i++) {
        //                 if (this.responseArray[i]) {
        //                     if (data.key == this.responseArray[i].key) {
        //                         // this.responseArray[i] = data;
        //                         index = i;
        //                         flag = true;
        //                     }
        //                 }
        //             }
        //             if (!flag) {
        //                 this.responseArray.push(data);
        //             } else {
        //                 this.responseArray[index] = data;
        //                 index = 0;
        //                 flag = false;
        //             }
        //         }
        //         if (data.userResponse === 'angry') {
        //             if (this.angryWeekCount) {
        //                 this.angryWeekCount++;
        //             } else {
        //                 this.angryWeekCount = 1
        //             }
        //             this.angryWeekCountArray[weekDay] = this.angryWeekCount;
        //             if (angryCount) {
        //                 angryCount++;
        //             } else {
        //                 angryCount = 1
        //             }


        //             let index = 0, flag = false;
        //             for (let i = 0; i <= this.responseArray.length; i++) {
        //                 if (this.responseArray[i]) {
        //                     if (data.key == this.responseArray[i].key) {
        //                         // this.responseArray[i] = data;
        //                         index = i;
        //                         flag = true;
        //                     }
        //                 }
        //             }
        //             if (!flag) {
        //                 this.responseArray.push(data);
        //             } else {
        //                 this.responseArray[index] = data;
        //                 index = 0;
        //                 flag = false;
        //             }
        //             this.clicksObject['angry'] = angryCount;
        //         }
        //         if (data.userResponse === 'moderat') {
        //             if (this.moderateWeekCount) {
        //                 this.moderateWeekCount++;
        //             } else {
        //                 this.moderateWeekCount = 1;
        //             }
        //             this.moderatWeekCountArray[weekDay] = this.moderateWeekCount;
        //             if (moderatCount) {
        //                 moderatCount++;
        //             } else {
        //                 moderatCount = 1
        //             }
        //             this.clicksObject['moderat'] = moderatCount;


        //             let index = 0, flag = false;
        //             for (let i = 0; i <= this.responseArray.length; i++) {
        //                 if (this.responseArray[i]) {
        //                     if (data.key == this.responseArray[i].key) {
        //                         // this.responseArray[i] = data;
        //                         index = i;
        //                         flag = true;
        //                     }
        //                 }
        //             }
        //             if (!flag) {
        //                 this.responseArray.push(data);
        //             } else {
        //                 this.responseArray[index] = data;
        //                 index = 0;
        //                 flag = false;
        //             }

        //         }
        //     });
        //     this.setState({
        //         moderatWeekCountArray: [...this.moderatWeekCountArray],
        //         happyWeekCountArray: [...this.happyWeekCountArray],
        //         angryWeekCountArray: [...this.angryWeekCountArray],
        //         countClicks: this.clicksObject,
        //         responseArray: this.responseArray.slice(0, 10)
        //     }, function () {
        //         console.log('this.state.countClick: ', this.state.countClicks);
        //         this.moderatWeekCountArray = [];
        //         this.happyWeekCountArray = [];
        //         this.angryWeekCountArray = [];
        //         this.moderateWeekCount = 0;
        //         this.angryWeekCount = 0;
        //         this.happyWeekCount = 0;
        //         this.clicksObject = {};
        //     });
        // }
    }
    calculateResponsesMonthlyWise = (array) => {
        console.log('this: /**/*/*/*/*/*/*/ array.length', array.length);
        if (array !== undefined) {
            console.log('Before forEach Calculation Done: ', this.happyMonthCountArray, this.angryMonthCountArray, this.moderatMonthCountArray);
            // let { angryReasonsCount } = this.state;
            array.forEach((data, i) => {
                let date = new Date(data.timeStamp).getDate();
                this.happyMonthCount = this.happyMonthCountArray[date];
                this.moderateMonthCount = this.moderatMonthCountArray[date];
                this.angryMonthCount = this.angryMonthCountArray[date];
                let angryCount = this.clicksObject['angry'];
                let happyCount = this.clicksObject['happy'];
                let moderatCount = this.clicksObject['moderat'];
                if (data.userResponse === 'satisfied') {
                    if (this.happyMonthCount) {
                        this.happyMonthCount++;
                    } else {
                        this.happyMonthCount = 1
                    }
                    this.happyMonthCountArray[date] = this.happyMonthCount;
                    if (happyCount) {
                        happyCount++;
                    } else {
                        happyCount = 1
                    }
                    this.clicksObject['happy'] = happyCount;
                    let index = 0, flag = false;
                    for (let i = 0; i <= this.responseArray.length; i++) {
                        if (this.responseArray[i]) {
                            if (data.key == this.responseArray[i].key) {
                                // this.responseArray[i] = data;
                                index = i;
                                flag = true;
                            }
                        }
                    }
                    if (!flag && (data.message || data.audioURL)) {

                        this.responseArray.push(data);
                    } else {
                        this.responseArray[index] = data;
                        index = 0;
                        flag = false;
                    }
                }
                if (data.userResponse === 'angry') {
                    if (this.angryMonthCount) {
                        this.angryMonthCount++;
                    } else {
                        this.angryMonthCount = 1
                    }
                    this.angryMonthCountArray[date] = this.angryMonthCount;

                    //reasons

                    if (this.angryReasonsCount[data.reason]) {
                        this.angryReasonsCount[data.reason] += 1
                    } else {
                        this.angryReasonsCount[data.reason] = 1;
                    }

                    if (angryCount) {
                        angryCount++;
                    } else {
                        angryCount = 1
                    }
                    let index = 0, flag = false;
                    for (let i = 0; i <= this.responseArray.length; i++) {
                        if (this.responseArray[i]) {
                            if (data.key == this.responseArray[i].key) {
                                // this.responseArray[i] = data;
                                index = i;
                                flag = true;
                            }
                        }
                    }
                    if (!flag && (data.message || data.audioURL)) {
                        this.responseArray.push(data);
                    } else {
                        this.responseArray[index] = data;
                        index = 0;
                        flag = false;
                    }
                    this.clicksObject['angry'] = angryCount;
                }
                if (data.userResponse === 'moderat') {
                    if (this.moderateMonthCount) {
                        this.moderateMonthCount++;
                    } else {
                        this.moderateMonthCount = 1;
                    }
                    this.moderatMonthCountArray[date] = this.moderateMonthCount;

                    if (moderatCount) {
                        moderatCount++;
                    } else {
                        moderatCount = 1
                    }
                    this.clicksObject['moderat'] = moderatCount;
                    let index = 0, flag = false;
                    for (let i = 0; i <= this.responseArray.length; i++) {
                        if (this.responseArray[i]) {
                            if (data.key == this.responseArray[i].key) {
                                // this.responseArray[i] = data;
                                index = i;
                                flag = true;
                            }
                        }
                    }
                    if (!flag && (data.message || data.audioURL)) {
                        this.responseArray.push(data);
                    } else {
                        this.responseArray[index] = data;
                        index = 0;
                        flag = false;
                    }
                }
            });
            console.log('after forEach Calculation Done: ', this.happyMonthCountArray, this.angryMonthCountArray, this.moderatMonthCountArray);
            this.setState({
                moderatMonthCountArray: [...this.moderatMonthCountArray],
                happyMonthCountArray: [...this.happyMonthCountArray],
                angryMonthCountArray: [...this.angryMonthCountArray],
                countClicks: this.clicksObject,
                responseArray: this.responseArray.slice(0, 10),
                angryReasonsCount: this.angryReasonsCount
            }, function () {
                this.moderatMonthCountArray = [];
                this.happyMonthCountArray = [];
                this.angryMonthCountArray = [];
                this.moderateMonthCount = 0;
                this.angryMonthCount = 0;
                this.happyMonthCount = 0;
                this.clicksObject = {};
                this.angryReasonsCount = {};
                console.log('incallback forEach Calculation Done: ', this.happyMonthCountArray, this.angryMonthCountArray, this.moderatMonthCountArray);
            });
        }
    }
    callPaging = () => {
        if (!this.state.stopPaging) {

            let scrollTop = document.documentElement.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight;
            let offsetHeight = document.documentElement.clientHeight;
            let contentHeight = scrollHeight - offsetHeight;
            let flag = false, { responseArrayIterations } = this.state, index = 0;
            if (contentHeight <= scrollTop) {
                for (let i = responseArrayIterations; i <= responseArrayIterations + 5; i++) {
                    if (this.responseArray[i] == undefined) {
                        flag = true;
                        index = i;
                    }
                }
                if (flag) {
                    this.setState({ responseArray: [...this.state.responseArray, ...this.responseArray.slice(responseArrayIterations, index)], stopPaging: true });
                } else {
                    this.setState({
                        responseArray: [...this.state.responseArray, ...this.responseArray.slice(responseArrayIterations, responseArrayIterations + 10)],
                        responseArrayIterations: this.state.responseArrayIterations + 5
                    })
                }
            }
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
    dateHandler = (e) => {
        this.setState({ isProgress: true, stopPaging: false, countClicks: {}, responseArray: [], date: e.target.value });
        this.responseArray = [];
        this.timeRef = setTimeout(() => {
            this.setState({ isProgress: false });
            clearTimeout(this.timeRef);
        }, 2000);
        let date = e.target.value;
        let formatedDate = `${date.slice(8, 10)}-${date.slice(5, 7)}-${date.slice(0, 4)}`;
        console.log(formatedDate);
        //    console.log('Selected Branch: ', this.state.selectedBranch);
        this.props.clearMonthlyArray();
        this.getMonthlyDatesArray(formatedDate, this.state.selectedBranch);
        //     this.happyMonthCountArray=[]; this.angryMonthCountArray=[]; this.moderatMonthCountArray=[];
        //    this.setState({happyMonthCountArray: [], angryMonthCountArray:[], moderatMonthCountArray:[]});
        this.iteration = 0;
    }
    weeklyDateHandler = (e) => {
        this.setState({ isProgress: true, stopPaging: false, countClicks: {}, responseArray: [], date: e.target.value });
        this.responseArray = [];
        this.timeRef = setTimeout(() => {
            this.setState({ isProgress: false });
            clearTimeout(this.timeRef);
        }, 2000);
        this.props.clearWeeklyArray();
        let oldDate = e.target.value;
        let formatedDate = `${oldDate.slice(8, 10)}-${oldDate.slice(5, 7)}-${oldDate.slice(0, 4)}`;
        let date = this.getMonday(this.dateFormatter(formatedDate));
        let month = date.getMonth() + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        let day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate()
        let fullDate = `${day}-${month}-${date.getFullYear()}`;
        this.datesArray[0] = fullDate;
        for (let i = 1; i <= 6; i++) {
            let date = this.getMonday(this.dateFormatter(formatedDate));
            date = date.addDays(i);
            let day = date.getDate().toString().length === 1 ? ('0' + date.getDate().toString()) : date.getDate();
            let month = date.getMonth() + 1;
            month = month.toString().length > 1 ? month : `0${month}`;
            let fullDate = `${day}-${month}-${date.getFullYear()}`;
            this.datesArray.push(fullDate);
        }
        for (let i = 0; i < this.datesArray.length; i++) {
            this.props.getWeeklyData(this.datesArray[i], this.state.selectedBranch);
        }
        this.datesArray = [];
        this.iteration = 0;
    }
    render() {
        console.log("this.clickCount///////////////////: ", this.state.countClicks);
        if (this.state.isProgress) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader type="Bars" color="#somecolor" height={80} width={80} />
                </div>
            )
        }
        return (
            <Navbar history={this.props.history} changeHandler={(event) => this.handleChange(event)} selectedBranch={this.state.selectedBranch}>
                {
                    this.state.selectedBranch === "select branch" ? <div><h1>Please Select Your Branch</h1></div> :
                        <div style={{ backgroundColor: "#f5f5f5" }} >
                            <Grid container direction="row" justify="center">
                                <Grid item md={4} xs={10}>
                                    <h1 style={{
                                        textAlign: 'center',
                                        marginTop: '0.5em',
                                        color: "lightslategrey"
                                    }}>
                                        Select Date
                                    </h1>
                                    <Card>
                                        <CardContent style={{ textAlign: 'center' }}>
                                            <TextField
                                                id="date"
                                                type="date"
                                                defaultValue="Select Date"
                                                value={this.state.date}
                                                // InputLabelProps={{
                                                //   shrink: true,
                                                // }}
                                                onChange={(e) => this.dateHandler(e)}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container direction={'row'} justify="center"  >
                                <Grid item md={4} xs={10} style={{ padding: 15 }}  >
                                    <Card >
                                        <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                            <img src={require('./assets/happy.png')} height='125px' width='125px' />
                                            <div style={{ textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center" }} >
                                                <Typography variant="caption" gutterBottom>
                                                    Happy Clicks
                                                </Typography>
                                                <Typography variant="display2" style={{ textAlign: "center" }} gutterBottom>
                                                    {this.state.countClicks['happy'] || 0}
                                                </Typography>
                                            </div>
                                        </CardContent>

                                    </Card>
                                </Grid>
                                <Grid item md={4} xs={10} style={{ padding: 15 }}>
                                    <Card >
                                        <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                            <img src={require('./assets/moderate.png')} height='125px' width='125px' />
                                            <div style={{ textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center" }} >
                                                <Typography variant="caption" gutterBottom>
                                                    Moderate Clicks
                                    </Typography>
                                                <Typography variant="display2" style={{ textAlign: "center" }} gutterBottom>
                                                    {this.state.countClicks['moderat'] || 0}
                                                </Typography>
                                            </div>
                                        </CardContent>

                                    </Card>
                                </Grid>
                                <Grid item md={4} xs={10} style={{ padding: 15 }}>
                                    <Card >
                                        <CardContent style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                                            <img src={require('./assets/__sad.png')} height='125px' width='125px' />
                                            <div style={{ textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center" }} >
                                                <Typography variant="caption" gutterBottom>
                                                    Angry Clicks
                                    </Typography>
                                                <Typography variant="display2" style={{ textAlign: "center" }} gutterBottom>
                                                    {this.state.countClicks['angry'] || 0}
                                                </Typography>
                                            </div>
                                        </CardContent>

                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container justify='center' direction={'row'}>
                                <Grid item md={12} xs={10} style={{ padding: 15 }}>
                                    <Card >
                                        <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <BarChart heading={"Monthly Response"}
                                                chartData={{
                                                    labels: this.state.datesArray, //x-axis label array
                                                    datasets: [
                                                        {
                                                            label: 'Happy',
                                                            data: this.state.happyMonthCountArray,
                                                            backgroundColor: "#4FAB56"
                                                        },
                                                        {
                                                            label: 'Moderate',
                                                            data: this.state.moderatMonthCountArray,
                                                            backgroundColor: '#F99D2C'
                                                        },
                                                        {
                                                            label: 'Angry',
                                                            data: this.state.angryMonthCountArray,
                                                            backgroundColor: "#E83E3B"
                                                        }
                                                    ]
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container justify='center' direction={'row'}>
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
                                <Grid item md={8} xs={10} style={{ padding: 15 }}>
                                    <Card CardContent style={{ height: '100%' }}>
                                        <CardContent style={{ height: '100%' }}>
                                            <Typography variant="subheading" style={{ textAlign: "center" }} gutterBottom>
                                                PAIN POINTS
                                            </Typography>
                                            <div>
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="caption">Waiting Time</Typography>
                                                        <div>
                                                            {this.state.angryReasonsCount['Waiting Time']}
                                                        </div>
                                                    </div>
                                                    <Progress size="tiny" percent={this.state.angryReasonsCount['Waiting Time'] + 5} color='red' />
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="caption">Enviroment</Typography>
                                                    <div>
                                                        {this.state.angryReasonsCount['Enviroment']}
                                                    </div>
                                                </div>
                                                <Progress size="tiny" percent={this.state.angryReasonsCount['Enviroment'] + 5} color='brown' />
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="caption">Attitude</Typography>
                                                    <div>
                                                        {this.state.angryReasonsCount['Attitude']}
                                                    </div>
                                                </div>
                                                <Progress size="tiny" percent={this.state.angryReasonsCount['Attitude'] + 5} color='teal' />
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="caption">Bad Service</Typography>
                                                    <div>
                                                        {this.state.angryReasonsCount['Bad Service']}
                                                    </div>
                                                </div>
                                                <Progress size="tiny" percent={this.state.angryReasonsCount['Bad Service'] + 5} color='blue' />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    {/* <Card > */}
                                    {/* <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> */}
                                    {/* <BarChart heading={"Weekly Response"}
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
                                            /> */}
                                    {/* <BarChart heading={"Hourly Response"}
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
                                            /> */}
                                    {/* </CardContent> */}
                                    {/* </Card> */}
                                </Grid>
                            </Grid>
                            {/* <Grid container justify='center' direction={'row'}>
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
                            </Grid> */}

                            <Grid container justify="center" direction="row">
                                <Grid item md={12} xs={10} style={{ padding: 15 }}>
                                    <Card>
                                        <CardContent>
                                            <h3>OPEN FEEDBACK</h3>
                                        </CardContent>
                                        {
                                            this.state.responseArray.map((data) => {
                                                if (data.message || data.audioURL) {
                                                    return (
                                                        <CardContent>
                                                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                                <div>
                                                                    <img src={require(`${Images[data.userResponse]}`)} className='openFeedbackImg' />
                                                                </div>
                                                                <div style={{ marginLeft: '15px', alignSelf: 'center' }}>
                                                                    {
                                                                        data.message && data.message.length ?
                                                                            <div style={{
                                                                                backgroundColor: 'lightgray',
                                                                                padding: '10px',
                                                                                borderRadius: '10px',
                                                                                fontSize: '13px'
                                                                            }}>
                                                                                <span>
                                                                                    {data.message}
                                                                                </span>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                    <div style={{ display: 'flex', alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                                                                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                                            <span style={{ color: '#a9a9a9', fontSize: '10.5px' }}>
                                                                                {timeAndDateformatter(data.timeStamp)};
                                                                    </span>
                                                                            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                                                <Location style={{ color: "#a9a9a9", fontSize: '15px' }} />
                                                                                <span style={{ fontWeight: 'bold', color: '#a9a9a9', fontSize: '13px' }}>
                                                                                    {data.location}
                                                                                </span>
                                                                            </span>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div >
                                                                {
                                                                    data.audioURL ?
                                                                        <AudioPlayer audioURL={data.audioURL} />
                                                                        :
                                                                        null

                                                                }
                                                            </div>

                                                        </CardContent>
                                                    )
                                                }
                                            })
                                        }
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
        currentDate: state.dbReducer.currentDate,
        selectedBranch: state.dbReducer.currentBranch,
        isProgress: state.dbReducer.isProgress
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        getDataDateWise: (date, branch) => dispatch(DBActions.getDataDateWise(date, branch)),
        getHourlyData: (obj) => dispatch(DBActions.getHourlyData(obj)),
        getWeeklyData: (date, branch) => dispatch(DBActions.getWeeklyData(date, branch)),
        getRealtimeData: (date, branch) => dispatch(DBActions.getRealTimeData(date, branch)),
        hourlyDataFlagFalse: () => dispatch(DBActions.hourlyDataFlagFalse()),
        setCurrentBranch: (branch) => dispatch(DBActions.setCurrentBranch(branch)),
        clearMonthlyArray: () => dispatch(DBActions.clearMonthlyArray()),
        clearWeeklyArray: () => dispatch(DBActions.clearWeeklyArray()),
    }
}
export default connect(mapStateToPorps, mapDispatchToPorps)(Monthly);
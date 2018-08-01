import actionTypes from '../actionTypes';


class DBActions {
    static hourlyDataFlagFalse() {
        return {
            type: actionTypes.GET_HOURLY_DATA_FLAG_FALSE
        }
    }

    static getHourlyData(obj) {
        return {
            type: actionTypes.GET_HOURLY_DATA_PROGRESS,
            payload: obj
        }
    }
    static getWeeklyData(date, branch) {
        return {
            type: actionTypes.GET_WEEKLY_DATA_PROGRESS,
            payload: { date, branch }
        }
    }
    static getRealTimeData(date, branch) {
        return {
            type: actionTypes.GET_REALTIME_DATA,
            payload: { date, branch }
        }
    }
    static getRealTimeDataSucceed(array) {
        return {
            type: actionTypes.GET_REALTIME_DATA_SUCCEED,
            payload: array
        }
    }
    static incrementIteration(){
        return {
            type:actionTypes.INCREMENT_ITERATION
        }
    }
    static resetIteration(){
        return{
            type:actionTypes.RESET_ITERATION
        }
    }
    static getCurrentDate(){
        return {
            type:actionTypes.GET_CURRENT_DATE_PROGRESS
        }
    }
}



export default DBActions;
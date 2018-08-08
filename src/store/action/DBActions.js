import actionTypes from '../actionTypes';


class DBActions {
    static getDataDateWise(date, branch){
        return{
            type: actionTypes.GET_DATA_DATE_WISE_PROGRESS,
            payload: {date,branch}
        }
    }

    static clearMonthlyArray(){
        return{
            type: actionTypes.CLEAR_MONTHLY_ARRAY
        }
    }
    
    static clearWeeklyArray(){
        return{
            type: actionTypes.CLEAR_WEEKLY_ARRAY
        }
    }

    static hourlyDataFlagFalse() {
        return {
            type: actionTypes.GET_HOURLY_DATA_FLAG_FALSE
        }
    }
    static setCurrentBranch(branch){
        return{
            type: actionTypes.SET_CURRENT_BRANCH,
            payload: branch
        }
    }
    static loadBraches(){
        return{
            type: actionTypes.LOAD_BRANCHES
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
import actionTypes from '../actionTypes';


class DBActions {
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
}



export default DBActions;
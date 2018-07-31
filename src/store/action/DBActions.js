import actionTypes from '../actionTypes';


class DBActions{
   static getHourlyData(obj){
       return{
           type: actionTypes.GET_HOURLY_DATA_PROGRESS,
           payload: obj
       }
   }
   static getWeeklyData(date,branch){
       return {
           type:actionTypes.GET_WEEKLY_DATA_PROGRESS,
           payload:{date,branch}
       }
   }
   static getRealTimeData(date,branch){
       return{
           type:actionTypes.GET_REALTIME_DATA,
           payload:{date,branch}
       }
   }
   static getRealTimeDataSucceed(array){
    return {
        type:actionTypes.GET_REALTIME_DATA_SUCCEED,
        payload:array
    }
   }
   static getHourlyDataFlagFalse(){
       return{
           type:actionTypes.GET_HOURLY_DATA_UPDATE_FLAG_FALSE
       }
   }
}



export default DBActions;
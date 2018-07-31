import actionTypes from '../actionTypes';


class DBActions{
   static getHourlyData(obj){
       return{
           type: actionTypes.GET_HOURLY_DATA_PROGRESS,
           payload: obj
       }
   }

   static getWeeklyData(date, branch){
       return{
           type: actionTypes.GET_WEEKLY_DATA_PROGRESS,
           payload: {date, branch}
       }
   }

   static getRealtimeData(date,branch){
       return{
           type: actionTypes.GET_REALTIME_DATA,
            payload: {date, branch}
       }
   }
   
   static getRealtimeDataSucceed(array){
       return{
           type: actionTypes.GET_REALTIME_DATA_SUCCEED,
           payload: array
       }
   }
}



export default DBActions;
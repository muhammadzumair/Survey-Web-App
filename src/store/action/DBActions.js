import actionTypes from '../actionTypes';


class DBActions{
   static getHourlyData(date,branch){
       return {
           type:actionTypes.GET_HOURLY_DATA_PROGRESS,
           payload:{date,branch}
       }
   }
   static getHourlyDataError(message){
    return{
        type:actionTypes.GET_HOURLY_DATA_FAIL,
        payload:message
    }
   }
}

export default DBActions;
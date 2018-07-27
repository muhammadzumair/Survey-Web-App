import actionTypes from '../actionTypes';


class DBActions{
   static getHourlyData(obj){
       return{
           type: actionTypes.GET_HOURLY_DATA_PROGRESS,
           payload: obj
       }
   }
}

export default DBActions;
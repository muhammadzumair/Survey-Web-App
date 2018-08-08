import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {createLogger} from 'redux-logger';

import EpicActions from './epic/EpicActions';
import AuthEpic from './epic/AuthEpic';
import dbReducer from './reducer/DBReducer';
import authReducer from './reducer/AuthRducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    dbReducer,
    authReducer
});

export const rootEpic = combineEpics(
    EpicActions.getHourlyData,
    EpicActions.getWeeklyData,
    EpicActions.getRealtimeData,
    EpicActions.loadBraches,
    AuthEpic.signInUserFromFirebase,
    AuthEpic.singOutUserFromFirebase,
    AuthEpic.authStateChanged,
    EpicActions.getCurrentDate,
    EpicActions.getDataDateWise
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware,loggerMiddleware);

export let store = createStore(rootReducer, createStoreWithMiddleware);
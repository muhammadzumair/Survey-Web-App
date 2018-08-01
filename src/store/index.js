import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {createLogger} from 'redux-logger';

import EpicActions from './epic/EpicActions';
import dbReducer from './reducer/DBReducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    dbReducer
});

export const rootEpic = combineEpics(
    EpicActions.getHourlyData,
    EpicActions.getWeeklyData,
    EpicActions.getRealtimeData,
    EpicActions.loadBraches
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware,loggerMiddleware);

export let store = createStore(rootReducer, createStoreWithMiddleware);
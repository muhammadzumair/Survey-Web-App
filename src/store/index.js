import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import EpicActions from './epic/EpicActions';
import dbReducer from './reducer/DBReducer';


const rootReducer = combineReducers({
    dbReducer
});

export const rootEpic = combineEpics(
    EpicActions.getHourlyData
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware);

export let store = createStore(rootReducer, createStoreWithMiddleware);
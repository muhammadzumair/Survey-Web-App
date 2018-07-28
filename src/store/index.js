import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import EpicActions from './epic/EpicActions';
import DBReducer from './reducer/DBReducer';


const rootReducer = combineReducers({
    DBReducer
});

export const rootEpic = combineEpics(
    
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware);

export let store = createStore(rootReducer, createStoreWithMiddleware);
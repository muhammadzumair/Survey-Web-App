import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import EpicGitAction from './epic/github';
import githubReducer from './reducer/github';


const rootReducer = combineReducers({
    githubReducer
});

export const rootEpic = combineEpics(
    EpicGitAction.getUserInfo
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware);

export let store = createStore(rootReducer, createStoreWithMiddleware);
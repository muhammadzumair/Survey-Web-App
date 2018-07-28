import actionTypes from '../actionTypes';

let intialState = {
    loader: false,
    repos: []
}

function DBReducer(state = intialState, action) {
    switch (action.type) {

        default:
            return state;
    }
}

export default DBReducer;
import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload); //action.payload is the id, omit will remove the id from the object
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;
            return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POSTS:
            // create object w/ same values & keys as specified
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}
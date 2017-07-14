import _ from 'lodash';
import { FETCH_POSTS } from '../actions/index';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            // create object w/ same values & keys as specified
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}
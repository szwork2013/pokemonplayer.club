import {SET_DONATION_DATA} from '../actions'

export function Donation(state = [], action) {

    switch (action.type) {
        case SET_DONATION_DATA: {
            return action.data;
        }
        default: {
            return state
        }
    }
}

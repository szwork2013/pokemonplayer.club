import {REFRESH_POKE_SERVER_STATUS} from '../actions'

let initialState = [];

export function Status(state = initialState, action) {

    switch (action.type) {
        case REFRESH_POKE_SERVER_STATUS: {
            return action.status;
        }
        default: {
            return state;
        }
    }
}

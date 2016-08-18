import {REFRESH_POKE_SERVER_STATUS, SEARCH_SERVER_STATUS} from '../actions'

let statusData = [];

export function Status(state = statusData, action) {

    switch (action.type) {
        case REFRESH_POKE_SERVER_STATUS: {
            if (0 === statusData.length) {
                statusData = action.status;
                return statusData;
            }

            for (let index = 0; index < statusData.length; index++) {
                statusData[index].ping = action.status[index].ping;
            }

            for (let index = 0; index < state.length; index++) {
                state[index].ping = action.status[index].ping;
            }

            return state;
        }
        case SEARCH_SERVER_STATUS: {

            let search = action.search;
            return statusData.filter((item)=> {
                let ping = item.ping,
                    name = item.name;

                if (-1 != name.indexOf(search) || -1 != ping.indexOf(search)) {
                    return true;
                }

                return false;
            });
        }
        default: {
            return state;
        }
    }
}

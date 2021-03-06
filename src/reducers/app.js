import {UPD_APP} from "../constants";

let initialState = {
    balance: 0,
    stock_id: 0,
    stocks: [],
    users: [],
    organization: [],
    config: [],
    docs: [],
    fields: [],
    providers: [],
    categories: [],
}

const app = (state = JSON.parse(window.localStorage.getItem('app')) || initialState, action) => {

    if (action.type === UPD_APP) {

        let newState = {};
        Object.keys(state).map(k => {
            newState[k] = state[k]
        });
        if (typeof(action.data) === 'object') {
            Object.keys(action.data).map(k => {
                newState[k] = action.data[k]
            });
        }
        window.localStorage.setItem('app', JSON.stringify(newState));
        return newState;

    } else {
        return state
    }

};

export default app;
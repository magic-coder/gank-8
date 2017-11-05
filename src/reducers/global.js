/**
 * Created by yongyuehuang on 2017/6/7.
 */
import * as type from '../actions/type';

const initState = {
    animateCls: 'normal', //过渡动画样式
};

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};

export const global = (state = initState, action) => {
    switch (action.type) {
        case "CURRENT_ANIMATE":
            return {
                ...state,
                animateCls: action.cls
            };
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            let handleData2 = handleData(state[action.category], action);
            let newVar = {
                ...state,
                [action.category]: handleData2
            };
            // console.log("newVar", newVar);
            return newVar;
        default:
            return {...state};
    }
};


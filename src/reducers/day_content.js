/**
 * Created by Administrator on 2016/7/2.
 */
import * as type from "../actions/type";

export function day_content(state, action) {
    switch (action.type) {
        case type.RECEIVE_DAY_CONTENT:
            console.log("day_content", action.day_content);
            return {
                ...state,   //三个点是展开符
                day_content: action.day_content
            };
        default:
            return {...state};
    }
}
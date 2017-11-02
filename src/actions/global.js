/**
 * Created by yongyuehuang on 2017/6/7.
 */
import * as type from './type.js'
export const currentAnimate = (cls) => ({
    type: 'CURRENT_ANIMATE',
    cls
});

export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});
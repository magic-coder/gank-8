import instance from 'utils/instance'
import * as type from './type.js'

const receiveContent = (response) => ({
    type: type.RECEIVE_DAY_CONTENT,
    day_content: response
});
//http://gank.io/api/day/2015/08/07
//http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1

export const getContent = (day) => async (dispatch, getState) => {
    try {
        let response = await instance.get(`/day/${day}`);
        // let response = await instance.get(`/day/2017/10/27`);
        await dispatch(receiveContent(response.data));
        // console.log('response.data: ', JSON.stringify(response.data));
        // console.log('response.data: ', response);
        return response
    } catch (error) {
        console.log('error: ', error)
    }
};
/**
 * Created by yongyuehuang on 2017/6/7.
 */
import * as type from './type.js'
import instance from 'utils/instance'

export const currentAnimate = (cls) => ({
    type: 'CURRENT_ANIMATE',
    cls
});

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});

export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});


export const getMeiZhi = (page, stateName) => async (dispatch) => {
    try {
        dispatch(requestData(stateName));
        let response = await instance.get(`/data/%E7%A6%8F%E5%88%A9/20/${page}`);
        await dispatch(receiveData(response.data.results, stateName));
        return response;
    } catch (error) {
        console.log('error: ', error)
    }
};

export const getSpecial = (page, special, stateName) => async (dispatch) => {
    try {
        dispatch(requestData(stateName));
        let response = await instance.get(`/data/${special}/10/${page}`);
        await dispatch(receiveData(response.data.results, stateName));
        return response;
    } catch (error) {
        console.log('error: ', error)
    }
};

export const getAndroid = (page, stateName) => async (dispatch) => {
    try {
        dispatch(requestData(stateName));
        let response = await instance.get(`/data/Android/10/${page}`);
        await dispatch(receiveData(response.data.results, stateName));
        return response;
    } catch (error) {
        console.log('error: ', error)
    }
};

export const getIOS = (page, stateName) => async (dispatch) => {
    try {
        dispatch(requestData(stateName));
        let response = await instance.get(`/data/iOS/10/${page}`);
        await dispatch(receiveData(response.data.results, stateName));
        return response;
    } catch (error) {
        console.log('error: ', error)
    }
};

// http://gank.io/api/search/query/listview/category/Android/count/10/page/1
export const searchAction = (key, category, page, stateName) => async (dispatch) => {
    try {
        dispatch(requestData(stateName));
        let response = await instance.get(`/search/query/${key}/category/${category}/count/10/page/${page}`);
        await dispatch(receiveData(response.data.results, stateName));
        return response;
    } catch (error) {
        console.log('error: ', error)
    }
};


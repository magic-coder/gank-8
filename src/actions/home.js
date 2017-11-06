/**
 * Created by Administrator on 2016/7/2.
 */
import instance from '../utils/instance'
import * as type from './type.js'
//这个叫做action，用于更新reduer中的state
const receiveNav = (response) => ({
    type: 'RECEIVE_NAV',
    navMain: response.data
});

//获取服务器的参数，并且返回一个异步的dispatch，dispatch的对象是自己定义的action
export const getNav = () => async (dispatch, getState) => {
    try {
        let response = await instance.get(`/book/navigation`);
        await dispatch(receiveNav(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
};

//分隔符====================================================================================

const receiveBook = (response) => ({
    type: 'RECEIVE_BOOK',
    bookDetails: response.data
});

export const getBook = () => async (dispatch, getState) => {
    try {
        let response = await instance.get(`/book/list`);
        await dispatch(receiveBook(response.data));
        return response
    } catch (error) {
        console.log('error: ', error)
    }
};

const receiveHistory = (response) => ({
    type: type.RECEIVE_HISTORY,
    historyArray: response.results
});

export const getHistory = (page) => async (dispatch, getState) => {
    try {
        let response = await instance.get(`/history/content/10/${page}`);
        console.log('history: ', response);
        await dispatch(receiveHistory(response.data));
        return response
    } catch (error) {
        console.log('error: ', error)
    }
};
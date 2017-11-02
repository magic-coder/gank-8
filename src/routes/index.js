import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Route, Router, Switch} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import createHistory from 'history/createHashHistory'

const history = createHistory();

/*
 全局导入less
 */
import '../app.less'

import * as global from '../actions/global'
import asyncComponent from '../AsyncComponent'

import App from '../app'
import Home from '../containers/Home/Home'
import RouterTest from '../containers/RouterTest/RouterTest'

const Search = asyncComponent(() => import(/* webpackChunkName: "search" */ "../containers/Search/Search"));
const BookList = asyncComponent(() => import(/* webpackChunkName: "bookList" */ "../containers/BookList/BookList"));
const DayContent = asyncComponent(() => import(/* webpackChunkName: "search" */ "../containers/DayContent/DayContent"));

@connect(
    state => {
        return {...state.global}
    },
    dispatch => bindActionCreators(global, dispatch)
)
export default class CRouter extends React.Component {

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.props.currentAnimate('normal')
        })
    }

    render() {
        return (
            <Router history={history}>
                <Route render={({location}) => {
                    return (
                        <App location={location}>
                            <Route location={location} exact path="/" component={Home}/>
                            <Route location={location} path="/search" component={Search}/>
                            <Route location={location} path="/day/:year/:month/:day" component={DayContent}/>
                            <Route location={location} path="/bookList/:bookId" component={BookList}/>
                        </App>
                    )
                }}/>
            </Router>
        );
    }
}
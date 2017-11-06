import React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import createHistory from 'history/createHashHistory'
/*
 全局导入less
 */
import '../app.less'


import App from '../App'
import Home from '../containers/Home/Home'
import Android from '../containers/Android/Android'
import IOS from '../containers/IOS/iOS'
import Search from '../containers/Search/Search'
import DayContent from '../containers/DayContent/DayContent'
import Gallery from '../containers/MeiZhi/Gallery'

const history = createHistory();
export default  class CRouter extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Route render={({location}) => {
                    return (
                        <App location={location}>
                            <Route location={location} exact path="/" component={Home}/>
                            <Route location={location} path="/search" component={Search}/>
                            <Route location={location} path="/meizhi" component={Gallery}/>
                            <Route location={location} path="/day/:year/:month/:day" component={DayContent}/>
                            <Route location={location} path="/Android" component={Android}/>
                            <Route location={location} path="/IOS" component={IOS}/>
                            {/*<Route location={location} path="/Android" component={Special}/>*/}
                            {/*<Route location={location} path="/IOS" component={Special}/>*/}
                        </App>
                    )
                }}/>
            </Router>
        );
    }
}

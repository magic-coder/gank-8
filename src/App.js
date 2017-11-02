import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
// import {Route, Router} from 'react-router-dom'

import {Layout, Button} from 'antd';
import SiderCustom from './containers/SiderCustom';
import HeaderCustom from './containers/HeaderCustom';

const {Content, Footer} = Layout;
/*component*/
import Header from './containers/Home/components/Header'
/*
 全局导入less
 */
import './app.less'

import {receiveData} from 'actions/global'

// @connect(
//     state => ({...state.global}),
//     dispatch => bindActionCreators( ...global, dispatch)
// )
class App extends React.Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        const {receiveData} = this.props;
        receiveData('admin', 'auth');
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
            // console.log(document.body.clientWidth);
        }
    }

    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const {receiveData} = this.props;
        const clientWidth = document.body.clientWidth;
        console.log(clientWidth);
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        console.log("this.props.location.pathname", this.props.location.pathname);
        const {auth, responsive} = this.props;
        return (
            <Layout className="ant-layout-has-sider">
                {!responsive.data.isMobile &&
                <SiderCustom collapsed={this.state.collapsed} path={this.props.location.pathname} />}
                <Layout>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} path={this.props.location.pathname}/>
                    <Content style={{margin: '0 16px', overflow: 'initial'}}>
                        {this.props.children}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        React-Admin ©2017 Created by 865470087@qq.com
                    </Footer>
                </Layout>
                {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                            {`
                            #root{
                                height: auto;
                            }
                        `}
                        </style>
                    )
                }
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const {auth = {data: {}}, responsive = {data: {}}} = state.global;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

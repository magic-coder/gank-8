/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Menu, Icon, Layout, Badge, Popover} from 'antd';
import screenfull from 'screenfull';
import SiderCustom from './SiderCustom';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

const {Header} = Layout;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
    };

    componentDidMount() {
        this.setState({
            user: '测试'
        });
    };

    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    };

    search = () => {

    };

    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({visible});
    };

    render() {
        const {responsive, path} = this.props;
        return (
            <Header style={{background: '#fff', padding: 0, height: 65}} className="custom-theme">
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide}/>} trigger="click"
                                 placement="bottomLeft" visible={this.state.visible}
                                 onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="trigger custom-trigger"/>
                        </Popover>
                    ) : (
                        <Icon
                            className="trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{lineHeight: '64px', float: 'right'}}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="search" onClick={this.search}>
                        <Link to={'/search'}> <Icon type="search" onClick={this.search}/></Link>
                    </Menu.Item>

                    <Menu.Item key="full" onClick={this.screenFull}>
                        <Icon type="arrows-alt" onClick={this.screenFull}/>
                    </Menu.Item>


                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const {responsive = {data: {}}} = state.global;
    return {responsive};
};

export default connect(mapStateToProps)(HeaderCustom);

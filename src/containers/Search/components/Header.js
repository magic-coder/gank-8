/**
 * Created by Administrator on 2016/7/2.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Menu, Dropdown, Icon, Button, Input} from 'antd';

const Search = Input.Search;
import '../styles/search.less'
//该组件没有做无状态优化处理，根据其他几个组件的优化方式，可以自行思考
export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.upDateValue(event.target.value);
    }

    render() {
        const {handleClick, currentHot} = this.props;
        // all | Android | iOS | 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App
        const menu = (
            <Menu>
                <Menu.Item>
                    <span>all</span>
                </Menu.Item>
                <Menu.Item>
                    <span>Android</span>
                </Menu.Item>
                <Menu.Item>
                    <span>iOS</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className='search-parent-layout'>
                {/*<h4 className='search-child-type'>分类：</h4>*/}
                <Dropdown overlay={menu}  className='search-child-select'>
                    <Button>all</Button>
                </Dropdown>
                <Search
                    className='search-child-input'
                    placeholder="input search text"
                    style={{width: '100%'}}
                    onSearch={this.handleChange}
                />
            </div>

        )
    }
}
Header.propTypes = {
    handleClick: PropTypes.func.isRequired,
    currentHot: PropTypes.string.isRequired,
    upDateValue: PropTypes.func.isRequired
};
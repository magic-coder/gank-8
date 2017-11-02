/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
//关于import什么时候用{}，什么时候不用大括号，通过那个插件或者组件是否包含default来判断，如果包含，则不需要{}

/*actions*/
import * as home from 'actions/home'
import * as global from 'actions/global'

/*component*/
import Header from './components/Header'
import ContentItem from './components/ContentItem';
/*files*/
const search = require('./files/search.svg');
import {Spin} from 'antd';
import './styles/home.less'

/**
 * connect中间件
 * connect一定要写在需要传递参数的组件头部，因为这是语法规则，只对当前关联的组件生效，和java的原理是一致的
 * state用法：state => state（传递全部state）， {return {...state.home, ...state.global}}（n个state）
 * dispatch用法：（单个action）bindActionCreators(navActions, dispatch)，（多个action）bindActionCreators({...action1, ...action2}, dispatch)
 */

@connect(
    state => ({...state.home}),
    dispatch => bindActionCreators({...home, ...global}, dispatch)
)
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        //例子：this.myfunction = this.myfunction.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const {historyArray} = nextProps;

    }

    componentWillMount() {
        const {historyArray} = this.props;
        if (historyArray.length === 0) {
            this.props.getHistory();
        }

    }

    handleItemClick(elem) {
        let date = elem.created_at.split('T');
        let args = date[0].replace(/-/g, "/");
        date = new Date(args);
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        let data = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), content: elem.content};
        let path = {
            pathname: `/day/${args}`,
            state: data// 相当于post
        };
        this.props.history.push(path);
        console.log("push", path);
    }

    render() {
        const {historyArray} = this.props;
        //还可以通过自定义样式传递给组件
        let bgClass = {background: '#00bb9c'}; //定义一个背景色的变量


        return (
            <div>
                <div className="style_div" >
                    {window.isEmpty(historyArray) ?
                        <Spin size="large">加载中....</Spin> :
                        <ul className="style_ul">
                            {
                                historyArray.map((elem, index) => {
                                    return (
                                        <ContentItem
                                            _id={elem._id}
                                            title={elem.title}
                                            content={elem.content}
                                            created_at={elem.created_at}
                                            handleClick={() => this.handleItemClick(elem)}
                                        />
                                    )
                                })

                            }
                        </ul>
                    }
                </div>
            </div>
        )
    }
}
Home.propTypes = {
    historyArray: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};
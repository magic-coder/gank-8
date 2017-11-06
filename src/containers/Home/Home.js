/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
//关于import什么时候用{}，什么时候不用大括号，通过那个插件或者组件是否包含default来判断，如果包含，则不需要{}

/*actions*/
import {getHistory} from '../../actions/global'

/*component*/
import ContentItem from './components/ContentItem';
import {Row, Col, Pagination, BackTop} from 'antd';
import './styles/home.less'

/*files*/

/**
 * connect中间件
 * connect一定要写在需要传递参数的组件头部，因为这是语法规则，只对当前关联的组件生效，和java的原理是一致的
 * state用法：state => state（传递全部state）， {return {...state.home, ...state.global}}（n个state）
 * dispatch用法：（单个action）bindActionCreators(navActions, dispatch)，（多个action）bindActionCreators({...action1, ...action2}, dispatch)
 */

class Home extends React.Component {
    state = {
        datas: [],
    };
    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        //例子：this.myfunction = this.myfunction.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {historyArray} = nextProps;
        if (!window.isEmpty(historyArray) && !window.isEmpty(historyArray.data)) {
            this.setState({
                datas: historyArray.data
            });
        }
    }

    componentWillMount() {
        const historyArray = this.state.datas;
        if (historyArray.length === 0) {
            this.props.getHistory(1, "historyArray");
        }
    }

    onChange(page) {
        this.props.getHistory(page, "historyArray");
        this.refs.myBackTop.scrollToTop();
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
    }

    render() {
        const historyArray = this.state.datas;
        console.log("historyArray", historyArray);
        let size = historyArray.length / 5;
        const special = [];
        for (let i = 0; i < size; i++) {
            special.push(historyArray.slice(5 * i, 5 * (i + 1)));
        }
        const imgsTags = special.map(v1 => (
            v1.map(elem => {
                return (
                    <div className="gutter-box" onClick={() => this.openSpecial(elem)}>
                        <ContentItem
                            _id={elem._id}
                            title={elem.title}
                            content={elem.content}
                            created_at={elem.created_at}
                            handleClick={() => this.handleItemClick(elem)}
                        />
                    </div>
                )
            })
        ));

        return (
            <div className="gutter-example button-demo">
                <Row gutter={12}>
                    {
                        imgsTags.map(imgsTag => {
                            return ( <Col className="gutter-row" md={6}>
                                {imgsTag}
                            </Col>);
                        })
                    }
                </Row>
                <style>{`
                    .ant-card-body img {
                        cursor: pointer;
                    }
                `}</style>
                <BackTop ref="myBackTop"/>
                <div style={{float: 'left'}}>
                    <Pagination defaultCurrent={1} total={500} onChange={this.onChange}/>
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

const mapStateToProps = state => {
    const {location = {}, historyArray = {data: []}} = state.global;
    return {historyArray, location};
};
const mapDispatchToProps = dispatch => ({
    getHistory: bindActionCreators(getHistory, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

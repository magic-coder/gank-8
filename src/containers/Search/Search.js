/**
 * Created by Administrator on 2016/7/2.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

/*actions*/
import {searchAction} from '../../actions/global'
import './styles/search.less'
import {Row, Col, Menu, Dropdown, BackTop, Pagination, Button, Input, Card} from 'antd';

const SearchInput = Input.Search;


// @connect(
//     state => ({...state.global}),
//     dispatch => bindActionCreators({...global}, dispatch)
// )
 class Search extends React.Component {
    state = {
        key: 'Android',
        category: 'all',
        page: 1,
        searchData: {data: []},
    };

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.openSpecial = this.openSpecial.bind(this);
    }

    componentWillMount() {
        this.props.searchAction(this.state.key, this.state.category, this.state.page, "search_data");
    }

    componentWillReceiveProps(nextProps) {
        const {search_data} = nextProps;
        if (!window.isEmpty(search_data) && !window.isEmpty(search_data.data)) {
            this.setState({
                searchData: search_data
            });
        }
    }

    // 分类
    onMenuClick({key}) {
        this.setState({
            category: encodeURI(key),
        });
        this.props.searchAction(this.state.key, this.state.category, this.state.page, "search_data");
    }

    openSpecial(special) {
        let win = window.open(special.url, '_blank');
        win.focus();
    }

    // 搜索
    handleSearch(text) {
        this.setState({
            key: text,
        });
        this.props.searchAction(this.state.key, this.state.category, this.state.page, "search_data");
    }

    // 分页
    onPageChange(page) {
        this.props.searchAction(this.state.key, this.state.category, page, "search_data");
        this.refs.myBackTop.scrollToTop();
    }

    render() {
        // all | Android | iOS | 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App
        const menu = (
            <Menu onClick={this.onMenuClick}>
                <Menu.Item key="all">
                    <span>All</span>
                </Menu.Item>
                <Menu.Item key="Android">
                    <span>Android</span>
                </Menu.Item>
                <Menu.Item key="iOS">
                    <span>iOS</span>
                </Menu.Item>
                <Menu.Item key="App">
                    <span>App</span>
                </Menu.Item>
                <Menu.Item key="休息视频">
                    <span>休息视频</span>
                </Menu.Item>
                <Menu.Item key="福利">
                    <span>福利</span>
                </Menu.Item>
                <Menu.Item key="拓展资源">
                    <span>拓展资源</span>
                </Menu.Item>
                <Menu.Item key="瞎推荐">
                    <span>瞎推荐</span>
                </Menu.Item>
                <Menu.Item key="拓展资源">
                    <span>前端</span>
                </Menu.Item>
            </Menu>
        );

        let searchData = this.state.searchData.data;
        console.log("searchData", searchData);
        if (window.isEmpty(searchData)) {
            searchData = [];
        }
        let size = searchData.length / 5;
        const special = [];
        for (let i = 0; i < size; i++) {
            special.push(searchData.slice(5 * i, 5 * (i + 1)));
        }
        const imgsTags = special.map(v1 => (
            v1.map(elem => {
                return (
                    <div className="gutter-box" onClick={() => this.openSpecial(elem)}>
                        <Card style={{width: "100%"}} bodyStyle={{padding: 10}}>
                            <div className="custom-card">
                                <h3 style={{padding: '5px'}}>{elem.desc}</h3>
                                <p style={{padding: '5px'}}>{elem.who}</p>
                                <p style={{padding: '5px'}}>{elem.publishedAt}</p>
                            </div>
                        </Card>
                    </div>
                )
            })
        ));

        return (
            <div style={{height: '100vh'}}>
                <div className='search-parent-layout'>
                    <Dropdown overlay={menu} className='search-child-select'>
                        <Button>{`分类：${decodeURI(this.state.category)}`}</Button>
                    </Dropdown>
                    <SearchInput
                        className='search-child-input'
                        placeholder={this.state.key}
                        style={{width: '100%'}}
                        onSearch={this.handleSearch}
                    />
                </div>
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
                <div style={{float: 'left', marginTop:' 0.6rem'}}>
                    <Pagination defaultCurrent={1} total={500} onChange={this.onPageChange}/>
                </div>
            </div>
        )
    }
}
// Search.propTypes = {
//     search_data: PropTypes.object.isRequired,
//     searchAction: PropTypes.func.isRequired
// };
const mapStateToProps = state => {
    const {search_data = {data: {}}} = state.global;
    return {search_data};
};
const mapDispatchToProps = dispatch => ({
    searchAction: bindActionCreators(searchAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

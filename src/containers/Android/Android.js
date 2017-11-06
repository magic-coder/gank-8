/**
 * Created by hao.cheng on 2017/5/6.
 */
import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Row, Col, Card, Pagination, BackTop} from 'antd';
import PropTypes from 'prop-types'
import {getAndroid} from '../../actions/global'

class Android extends React.Component {
    state = {
        gallery: null,
        datas: [],
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        const {getAndroid} = this.props;
        getAndroid(1, "android_data");

    }

    componentWillReceiveProps(nextProps) {
        const {android_data} = nextProps;
        if (!window.isEmpty(android_data) && !window.isEmpty(android_data.data)) {
            this.setState({
                datas: android_data.data
            });
        }
    }

    onChange(page) {
        this.props.getAndroid(page, "android_data");
        this.refs.myBackTop.scrollToTop();
    }

    openSpecial(special) {
        console.log("openSpecial", special);
        let win = window.open(special.url, '_blank');
        win.focus();
    }

    render() {
        const specials = this.state.datas;
        let size = specials.length / 5;
        const special = [];
        for (let i = 0; i < size; i++) {
            special.push(specials.slice(5 * i, 5 * (i + 1)));
        }

        const imgsTags = special.map(v1 => (
            v1.map(v2 => {
                let image_div = window.isEmpty(v2.images) ? (<div/>) : (<div>
                    <img alt="example" width="100%"
                         src={v2.images[0]}/>
                </div>);
                return (
                    <div className="gutter-box" onClick={() => this.openSpecial(v2)}>
                        <Card bordered={true} bodyStyle={{padding: 10}}>
                            {image_div}
                            <div className="pa-m">
                                <p>{v2.desc}</p>
                                <p>{v2.who}</p>
                            </div>
                        </Card>
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
                <BackTop ref="myBackTop"/>
                <div style={{float: 'left'}}>
                    <Pagination defaultCurrent={1} total={500} onChange={this.onChange}/>
                </div>
                <style>{`
                    .ant-card-body img {
                        cursor: pointer;
                    }
                `}</style>
            </div>
        )
    }
}

Android.propTypes = {
    android_data: PropTypes.string.isRequired,
    getAndroid: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {android_data = {data: {}}} = state.global;
    return {android_data};
};
const mapDispatchToProps = dispatch => ({
    getAndroid: bindActionCreators(getAndroid, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Android);

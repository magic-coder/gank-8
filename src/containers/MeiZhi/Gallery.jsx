/**
 * Created by hao.cheng on 2017/5/6.
 */
import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Row, Col, Card, Pagination, BackTop} from 'antd';
import PhotoSwipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import PropTypes from 'prop-types'
import {getMeiZhi} from '../../actions/global'

// @connect(
//     state => ({...state.global}),
//     dispatch => bindActionCreators({...global}, dispatch)
// )
 class Gallery extends React.Component {
    state = {
        gallery: null,
        meizi: [],
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const {getMeiZhi} = this.props;
        getMeiZhi(1, "meizi_data");
    }

    componentWillReceiveProps(nextProps) {
        const {meizi_data} = nextProps;
        if (!window.isEmpty(meizi_data.data)) {
            this.setState({
                meizi: meizi_data.data
            });
        }
    }

    componentWillUnmount = () => {
        this.closeGallery();
    };

    openGallery = (item) => {
        const items = [
            {
                src: item.url,
                w: 0,
                h: 0,
            }
        ];
        const pswpElement = this.pswpElement;
        const options = {index: 0};
        this.gallery = new PhotoSwipe(pswpElement, PhotoswipeUIDefault, items, options);
        this.gallery.listen('gettingData', (index, item) => {
            const _this = this;
            if (item.w < 1 || item.h < 1) { // unknown size
                var img = new Image();
                img.onload = function () { // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    _this.gallery.invalidateCurrItems(); // reinit Items
                    _this.gallery.updateSize(true); // reinit Items
                };
                img.src = item.src; // let's download image
            }
        });
        this.gallery.init();
    };
    closeGallery = () => {
        if (!this.gallery) return;
        this.gallery.close();
    };

    onChange(page) {
        this.props.getMeiZhi(page, "meizi_data");
        this.refs.myBackTop.scrollToTop();
    }

    render() {
        const meizi = this.state.meizi;
        let size = meizi.length / 5;
        const imgs = [];
        for (let i = 0; i < size; i++) {
            imgs.push(meizi.slice(5 * i, 5 * (i + 1)));
        }

        const imgsTags = imgs.map(v1 => (
            v1.map(v2 => (
                <div className="gutter-box">
                    <Card bordered={true} bodyStyle={{padding: 10}}>
                        <div>
                            <img onClick={() => this.openGallery(v2)} alt="example" width="100%" src={v2.url}/>
                        </div>
                        <div className="pa-m">
                            <span>{v2.who}</span>
                        </div>
                    </Card>
                </div>
            ))
        ));

        return (
            <div className="gutter-example button-demo">
                <Row gutter={10}>
                    {
                        imgsTags.map(imgsTag => {
                            return ( <Col className="gutter-row" md={5}>
                                {imgsTag}
                            </Col>);
                        })
                    }
                </Row>
                <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref={(div) => {
                    this.pswpElement = div;
                }}>

                    <div className="pswp__bg"/>

                    <div className="pswp__scroll-wrap">

                        <div className="pswp__container">
                            <div className="pswp__item"/>
                            <div className="pswp__item"/>
                            <div className="pswp__item"/>
                        </div>

                        <div className="pswp__ui pswp__ui--hidden">

                            <div className="pswp__top-bar">

                                <div className="pswp__counter"/>

                                <button className="pswp__button pswp__button--close" title="Close (Esc)"/>

                                <button className="pswp__button pswp__button--share" title="Share"/>

                                <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"/>

                                <button className="pswp__button pswp__button--zoom" title="Zoom in/out"/>

                                <div className="pswp__preloader">
                                    <div className="pswp__preloader__icn">
                                        <div className="pswp__preloader__cut">
                                            <div className="pswp__preloader__donut"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                <div className="pswp__share-tooltip"/>
                            </div>

                            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"/>

                            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"/>

                            <div className="pswp__caption">
                                <div className="pswp__caption__center"/>
                            </div>

                        </div>

                    </div>

                </div>
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
// Gallery.propTypes = {
//     meizi_data: PropTypes.string.isRequired,
//     getMeiZhi: PropTypes.func.isRequired,
// };

const mapStateToProps = state => {
    const {meizi_data = {data: {}}} = state.global;
    return {meizi_data};
};
const mapDispatchToProps = dispatch => ({
    getMeiZhi: bindActionCreators(getMeiZhi, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

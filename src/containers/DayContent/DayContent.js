/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Switch,Button} from 'antd';


/*actions*/
import {getContent} from '../../actions/day_content'

// @connect(
//     state => ({...state.day_content}),
//     dispatch => bindActionCreators({...day_content}, dispatch)
// )
 class DayContent extends React.Component {

    constructor(props) {
        super(props);
    }

    // http://gank.io/api/day/2015/08/07
    componentWillMount() {
        try {
            let data = {
                year: this.props.match.params.year,
                month: this.props.match.params.month,
                day: this.props.match.params.day,
            };
            console.log("location", this.props.location);
            let date = data.year + "/" + data.month + "/" + data.day;
            this.props.getContent(date);
        } catch (e) {
            console.log(e.toString());
        }
    }

    render() {
        return (
            <div>
                <div className="gutter-box">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Switch  defaultChecked={false}/>
                </div>
                <h5>{this.props.day_content === undefined ? "undefined" : JSON.stringify(this.props.day_content)}</h5>
            </div>
        );
    }
}


DayContent.propTypes = {
    day_content: PropTypes.string.isRequired,
    getContent: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {day_content} = state.global;
    return {day_content};
};
const mapDispatchToProps = dispatch => ({
    getContent: bindActionCreators(getContent, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DayContent);

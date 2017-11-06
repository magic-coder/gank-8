/**
 * Created by yongyuehuang on 2016/12/15.
 */
import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Card} from 'antd';

const cheerio = require('cheerio');

const ContentItem = (props) => {
    let {_id, title, content, created_at, handleClick} = props;
    let $ = cheerio.load(content);
    let image = $('img').attr('src');
    image = !window.isEmpty(image) ? image : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png";
    return (
        <Card style={{width: "100%"}} bodyStyle={{padding: 10}} onClick={handleClick}>
            <div className="custom-image">
                <img alt="example" width="100%" src={image}/>
            </div>
            <div className="custom-card">
                <h3 style={{padding: '5px'}}>{title}</h3>
                <p style={{padding: '5px'}}>{created_at}</p>
            </div>
        </Card>
    )
};
ContentItem.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};
export default ContentItem;
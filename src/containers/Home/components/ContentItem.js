/**
 * Created by yongyuehuang on 2016/12/15.
 */
import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Card} from 'antd';

const cheerio = require('cheerio')

const ContentItem = (props) => {
    let {_id, title, content, created_at, handleClick} = props;
    let $ = cheerio.load(content);
    console.log("cheerio", cheerio);
    let image = $('img').attr('src');
    image = !window.isEmpty(image) ? image : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png";
    return (
        <li key={_id} value={_id} style={{ background: '#E5E5E5', padding: '10px' }}>
            <Card style={{width: 240}} bodyStyle={{padding: 10}}  onClick={handleClick}>
                <div className="custom-image">
                    <img alt="example" width="100%" src={image}/>
                </div>
                <div className="custom-card">
                    <h3>{title}</h3>
                    <p>{created_at}</p>
                </div>
            </Card>
        </li>
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
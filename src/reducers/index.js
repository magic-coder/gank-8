import {home} from './home'
import {search} from './search'
import {global} from './global'
import {day_content} from './day_content'

const rootReducer = {
    /* your reducers */
    home, //首页相关
    search, //搜索相关
    day_content, // day_content
    global
};
export default rootReducer

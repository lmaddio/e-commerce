import { defineAction } from 'redux-define';
import { COMMON_STATUS } from 'App/request/constants';

const NAMESPACE = 'CATEGORIES';

const GET_CATEGORIES = defineAction('GET_CATEGORIES', COMMON_STATUS, NAMESPACE);

export default GET_CATEGORIES;

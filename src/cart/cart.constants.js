import { defineAction } from 'redux-define';
import { COMMON_STATUS } from 'App/request/constants';

const NAMESPACE = 'CART';

const ITEMS = defineAction('ITEMS', ['SET', 'SET_SAGA', 'REMOVE_SAGA', 'REMOVE_ALL'], NAMESPACE);
const BUY = defineAction('BUY', COMMON_STATUS, NAMESPACE);

export default {
  ITEMS,
  BUY,
};

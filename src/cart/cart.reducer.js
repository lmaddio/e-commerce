import CART from './cart.constants';

const initialState = {
  error: null,
  requesting: false,
  items: [],
};

function cart(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case CART.ITEMS.SET:
      return Object.assign({}, initialState, { items: payload.map(item => item) });
    case CART.ITEMS.REMOVE_ALL:
      return Object.assign({}, state, { items: [], requesting: false });
    case CART.BUY.ERROR:
      return Object.assign({}, state, { error: payload.error, requesting: false });
    case CART.BUY.LOADING:
      return Object.assign({}, state, { error: null, requesting: true });
    case CART.BUY.SUCCESS:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export default cart;

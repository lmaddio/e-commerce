import GET_CATEGORIES from './categories.constants';

const initialState = {
  error: null,
  requesting: false,
  items: [],
};

function categories(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES.LOADING:
      return Object.assign({}, state, { requesting: true });
    case GET_CATEGORIES.ERROR:
      return Object.assign({}, state, { requesting: false, error: action.payload.error });
    case GET_CATEGORIES.SUCCESS:
      return Object.assign({}, state, { items: action.payload, requesting: false });
    default:
      return state;
  }
}

export default categories;

import { GET_TOKEN, CLEAN_TOKEN } from './token.constants';

const initialState = {
  requesting: false,
  error: null,
  value: null,
  expiresIn: null,
};

function token(state = initialState, action) {
  const { type, payload } = action;
  const { error, token: tokenObject } = payload || {};
  switch (type) {
    case GET_TOKEN.LOADING:
      return Object.assign({}, state, { requesting: true });
    case GET_TOKEN.SUCCESS:
      return Object.assign({}, state, tokenObject, { requesting: false });
    case GET_TOKEN.ERROR:
    case CLEAN_TOKEN:
      return Object.assign({}, state, initialState, { requesting: false, error });
    default:
      return state;
  }
}

export default token;

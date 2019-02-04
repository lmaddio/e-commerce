import {
  PROFILE,
  LOGIN_USER,
  LOGOUT_USER,
} from './users.constants';

const initialState = {
  profile: {
    name: null,
    email: null,
  },
  error: null,
};

function user(state = initialState, action) {
  const { payload, type } = action;
  const { profile } = state;
  const { email, error } = payload || {};
  switch (type) {
    case PROFILE.SET_NAME:
      return Object.assign({}, state, { profile: Object.assign({}, profile, payload) });
    case PROFILE.SET_EMAIL:
      return Object.assign({}, state, { profile: Object.assign({}, profile, { email }) });
    case LOGIN_USER.ERROR:
      return Object.assign({}, state, { error });
    case LOGOUT_USER.LOADING:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export default user;

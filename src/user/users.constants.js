import { defineAction } from 'redux-define';
import { COMMON_STATUS } from 'App/request/constants';

const NAMESPACE = 'USER';

export const LOGIN_USER = defineAction('LOGIN', COMMON_STATUS, NAMESPACE);

export const PROFILE = defineAction('PROFILE',
  ['SET_NAME', 'SET_EMAIL', 'SET_PASSWORD', 'GET', 'SET', 'ERROR'],
  NAMESPACE);

export const LOGOUT_USER = defineAction('LOGOUT_USER', COMMON_STATUS, NAMESPACE);

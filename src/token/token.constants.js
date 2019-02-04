import { defineAction } from 'redux-define';
import { COMMON_STATUS } from 'App/request';

const NAMESPACE = 'TOKEN';

export const GET_TOKEN = defineAction('GET_TOKEN', COMMON_STATUS, NAMESPACE);

export const CLEAN_TOKEN = 'CLEAN_TOKEN';

export const SEND_TOKEN_TO_SAGAS = 'SEND_TOKEN_TO_SAGAS';

export const RENEW_TOKEN = defineAction('RENEW_TOKEN', ['GET'], NAMESPACE);

export const GET_TOKEN_FROM_COOKIES = 'GET_TOKEN_FROM_COOKIES';

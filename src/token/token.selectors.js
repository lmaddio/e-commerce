import { createSelector } from 'reselect';

const getToken = state => state.token;

export const getTokenValue = createSelector(
  getToken,
  token => token.value,
);

export const getTokenError = createSelector(
  getToken,
  token => token.error,
);

export const hasUserToken = createSelector(
  getTokenValue,
  getTokenError,
  (value, error) => (!error && value === null ? null : Boolean(value)),
);

export const isTokenLoading = createSelector(
  getToken,
  token => token.requesting,
);

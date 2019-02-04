import { createSelector } from 'reselect';

const getToken = state => state.token;

export const getTokenValue = createSelector(
  getToken,
  token => token.value,
);

export const hasUserToken = createSelector(
  getTokenValue,
  value => Boolean(value),
);

export const isTokenLoading = createSelector(
  getToken,
  token => token.requesting,
);

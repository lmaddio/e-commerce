import { createSelector } from 'reselect';

const getUser = state => state.user;

export const getLoginError = createSelector(
  getUser,
  user => user.error,
);

export const getUserProfile = createSelector(
  getUser,
  user => user.profile,
);

export const getUserName = createSelector(
  getUserProfile,
  profile => profile.name,
);

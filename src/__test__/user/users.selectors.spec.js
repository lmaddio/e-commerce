import {
  getLoginError,
  getUserProfile,
  getUserName,
} from 'user/users.selectors';

const mockState = {
  user: {
    error: 'error',
    profile: {
      name: 'name',
      password: 'password',
      email: 'email',
    },
  },
};

describe('user selectors', () => {
  describe('getLoginError', () => {
    it('Should return the value and recompute properly', () => {
      let result = getLoginError(mockState);
      expect(result).toEqual('error');
      expect(getLoginError.recomputations()).toEqual(1);

      result = getLoginError({ user: { error: 'test' } });
      expect(result).toEqual('test');
      expect(getLoginError.recomputations()).toEqual(2);

      getLoginError({ user: { error: 'test' } });
      expect(getLoginError.recomputations()).toEqual(3);
    });
  });

  describe('getUserProfile', () => {
    it('Should return the value and recompute properly', () => {
      let result = getUserProfile(mockState);
      const expected = {
        name: 'name',
        password: 'password',
        email: 'email',
      };
      expect(result).toEqual(expected);
      expect(getUserProfile.recomputations()).toEqual(1);

      result = getUserProfile({ user: { profile: {} } });
      expect(result).toEqual({});
      expect(getUserProfile.recomputations()).toEqual(2);

      getUserProfile({ user: { profile: {} } });
      expect(getUserProfile.recomputations()).toEqual(3);
    });
  });

  describe('getUserName', () => {
    it('Should return the value and recompute properly', () => {
      let result = getUserName(mockState);
      expect(result).toEqual('name');
      expect(getUserName.recomputations()).toEqual(1);

      result = getUserName({ user: { profile: { name: 'test' } } });
      expect(result).toEqual('test');
      expect(getUserName.recomputations()).toEqual(2);

      getUserName({ user: { profile: { name: 'test' } } });
      expect(getUserName.recomputations()).toEqual(3);
    });
  });
});

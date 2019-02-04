import { getTokenValue, hasUserToken, isTokenLoading } from 'token/token.selectors';

const mockState = {
  token: {
    requesting: true,
    error: 'fire',
    value: 'abcde',
    expiresIn: null,
  },
};

describe('token selectors', () => {
  describe('getTokenValue', () => {
    it('Should return the value and recompute properly', () => {
      let result = getTokenValue(mockState);
      expect(result).toEqual('abcde');
      expect(getTokenValue.recomputations()).toEqual(1);

      const newItems = {
        token: {
          ...mockState,
          vaue: '123',
        },
      };
      result = getTokenValue({ token: newItems });
      expect(result).toEqual(newItems.token.value);
      expect(getTokenValue.recomputations()).toEqual(2);

      getTokenValue(newItems);
      expect(getTokenValue.recomputations()).toEqual(3);
    });
  });

  describe('hasUserToken', () => {
    it('Should return the value and recompute properly', () => {
      let result = hasUserToken(mockState);
      expect(result).toEqual(true);
      expect(hasUserToken.recomputations()).toEqual(1);

      const newItems = {
        token: {
          ...mockState,
          vaue: null,
        },
      };
      result = hasUserToken(newItems);
      expect(result).toEqual(false);
      expect(hasUserToken.recomputations()).toEqual(2);

      hasUserToken(newItems);
      expect(hasUserToken.recomputations()).toEqual(2);
    });
  });

  describe('isTokenLoading', () => {
    it('Should return the value and recompute properly', () => {
      let result = isTokenLoading(mockState);
      expect(result).toEqual(true);
      expect(isTokenLoading.recomputations()).toEqual(1);

      const newItems = {
        token: {
          ...mockState,
          requesting: false,
        },
      };
      result = isTokenLoading(newItems);
      expect(result).toEqual(false);
      expect(isTokenLoading.recomputations()).toEqual(2);

      isTokenLoading(newItems);
      expect(isTokenLoading.recomputations()).toEqual(2);
    });
  });
});

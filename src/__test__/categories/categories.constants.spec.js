import GET_CATEGORIES from 'categories/categories.constants';

describe('categories constants', () => {
  it('Should have all its keys', () => {
    expect(GET_CATEGORIES.LOADING).toEqual('CATEGORIES/GET_CATEGORIES_LOADING');

    expect(GET_CATEGORIES.ERROR).toEqual('CATEGORIES/GET_CATEGORIES_ERROR');

    expect(GET_CATEGORIES.SUCCESS).toEqual('CATEGORIES/GET_CATEGORIES_SUCCESS');
  });
});

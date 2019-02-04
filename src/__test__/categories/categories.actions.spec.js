import GET_CATEGORIES from 'categories/categories.constants';
import {
  getCategories,
  setCategories,
  setCategoriesError,
} from 'categories/categories.actions';

describe('Cart actions', () => {
  it('getCategories', () => {
    const expected = {
      type: GET_CATEGORIES.LOADING,
    };
    const action = getCategories();
    expect(action).toEqual(expected);
  });

  it('setCategories', () => {
    const expected = {
      type: GET_CATEGORIES.SUCCESS,
      payload: [1],
    };
    const action = setCategories([1]);
    expect(action).toEqual(expected);
  });

  it('setCategoriesError', () => {
    const expected = {
      type: GET_CATEGORIES.ERROR,
      payload: {
        error: 'error message',
      },
    };
    const action = setCategoriesError('error message');
    expect(action).toEqual(expected);
  });
});

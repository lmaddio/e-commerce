import GET_CATEGORIES from './categories.constants';

export const getCategories = () => ({
  type: GET_CATEGORIES.LOADING,
});

export const setCategories = categories => ({
  type: GET_CATEGORIES.SUCCESS,
  payload: categories,
});

export const setCategoriesError = error => ({
  type: GET_CATEGORIES.ERROR,
  payload: {
    error,
  },
});

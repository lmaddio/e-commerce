import { createSelector } from 'reselect';

const getCategoriesObject = state => state.categories;

const getCategories = createSelector(
  getCategoriesObject,
  categories => categories.items,
);

export default getCategories;

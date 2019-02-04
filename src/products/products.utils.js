import escapeStringRegexp from 'escape-string-regexp';

export const convertMinMaxObject = (object, key) => {
  const { min, max } = object || {};
  return Object.assign({},
    min ? { [`${key}_gte`]: min } : {},
    max ? { [`${key}_lte`]: max } : {});
};

const MIN_MAX_OBJECTS = ['price', 'quantity'];
const UNDERSCORE_STRINGS = ['sort', 'order', 'page', 'limit'];
const LITERAL_STRINGS = ['sublevel_id', 'available'];
const SEARCH_STRINGS = ['name'];

export const manageFilters = (filters) => {
  if (!filters) {
    throw new Error('filters is not a valid data type, found: ', filters.toString);
  }
  return Object.entries(filters).reduce(
    (newObject, [key, value]) => {
      try {
        if (!value) {
          return newObject;
        }
        const nextObject = { ...newObject };
        if (UNDERSCORE_STRINGS.includes(key)) {
          nextObject[`_${key}`] = value;
        } else if (LITERAL_STRINGS.includes(key)) {
          nextObject[key] = value;
        } else if (SEARCH_STRINGS.includes(key)) {
          nextObject[`${key}_like`] = escapeStringRegexp(value);
        } else if (MIN_MAX_OBJECTS.includes(key)) {
          return {
            ...nextObject,
            ...convertMinMaxObject(value, key),
          };
        }
        return nextObject;
      } catch (error) {
        console.warn(error);
        return newObject;
      }
    }, {},
  );
};

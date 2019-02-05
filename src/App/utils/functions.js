const NUMBER_THOUSANDS = /\B(?=(\d{3})+(?!\d))/g;

export const addThousandsSeparator = (number = 0) => number.toString().replace(NUMBER_THOUSANDS, ',');

const FOR_EQUAL_VALUES = ['string', 'number', 'boolean'];

export const validateArrays = (arrayOne, arrayTwo) => {
  let areEqual = false;
  if (Array.isArray(arrayOne) && Array.isArray(arrayTwo)) {
    areEqual = arrayOne.length === arrayTwo.length;
    if (areEqual) {
      areEqual = arrayOne.every((item, index) => {
        if (FOR_EQUAL_VALUES.includes(typeof item)) {
          return item === arrayTwo[index];
        }
        const stateItemValuesKeys = Object.keys(item);
        const oldItemsValuesKeys = Object.keys(arrayTwo[index]);
        if (validateArrays(stateItemValuesKeys, oldItemsValuesKeys)) {
          const stateItemValues = Object.values(item);
          const oldItemsValues = Object.values(arrayTwo[index]);
          return validateArrays(stateItemValues, oldItemsValues);
        }
        return false;
      });
    }
  } else {
    areEqual = arrayOne === arrayTwo;
  }
  return areEqual;
};

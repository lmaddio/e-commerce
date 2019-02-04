import { convertMinMaxObject, manageFilters } from 'products/products.utils';

describe('products utis', () => {
  describe('convertMinMaxObject', () => {
    it('Should return new object with keys changed', () => {
      const object = { min: 5, max: 9 };
      const key = 'price';
      const result = convertMinMaxObject(object, key);
      const expected = {
        price_gte: 5,
        price_lte: 9,
      };
      expect(result).toEqual(expected);
    });

    it('Should return new object with only the matched keys', () => {
      let object = { min: 5 };
      const key = 'price';
      let result = convertMinMaxObject(object, key);
      let expected = {
        price_gte: 5,
      };
      expect(result).toEqual(expected);

      object = { max: 6 };
      result = convertMinMaxObject(object, key);
      expected = {
        price_lte: 6,
      };
      expect(result).toEqual(expected);
    });

    it('Should work with a falsy value ', () => {
      const key = 'price';
      let result = convertMinMaxObject(null, key);
      const expected = {};
      expect(result).toEqual(expected);

      result = convertMinMaxObject(false, key);
      expect(result).toEqual(expected);
    });
  });

  describe('manageFilters', () => {
    it('Should correctly format [\'price\', \'quantity\']', () => {
      const result = manageFilters({ price: { min: 2, max: 3 }, quantity: { min: 2, max: 1 } });
      const expected = {
        price_gte: 2,
        price_lte: 3,
        quantity_gte: 2,
        quantity_lte: 1,
      };
      expect(result).toEqual(expected);
    });

    it('Should correctly format [\'sort\', \'order\', \'page\', \'limit\']', () => {
      const result = manageFilters({
        sort: 'testSort',
        order: 'testOrder',
        page: 'testPage',
        limit: 'testLimit',
      });
      const expected = {
        _sort: 'testSort',
        _order: 'testOrder',
        _page: 'testPage',
        _limit: 'testLimit',
      };
      expect(result).toEqual(expected);
    });

    it('Should correctly format [\'sublevel_id\', \'available\']', () => {
      const result = manageFilters({
        sublevel_id: 'sub',
        available: 'test',
      });
      const expected = {
        sublevel_id: 'sub',
        available: 'test',
      };
      expect(result).toEqual(expected);
    });

    it('Should correctly format [\'name\']', () => {
      const result = manageFilters({
        name: 'sub',
      });
      const expected = {
        name_like: 'sub',
      };
      expect(result).toEqual(expected);
    });
  });
});

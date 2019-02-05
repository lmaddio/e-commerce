import { validateArrays, addThousandsSeparator } from 'App/utils/functions';

describe('App utils', () => {
  it('addThousandsSeparator -> Should add comma separator to numbers', () => {
    let result = addThousandsSeparator(1000000);
    let expected = '1,000,000';
    expect(result).toEqual(expected);

    result = addThousandsSeparator(100);
    expected = '100';
    expect(result).toEqual(expected);

    result = addThousandsSeparator('15555');
    expected = '15,555';
    expect(result).toEqual(expected);
  });

  it('validateArrays -> validate the content of two arrays', () => {
    let result = validateArrays([], []);
    expect(result).toBeTruthy();

    result = validateArrays(true, false);
    expect(result).toBeFalsy();

    result = validateArrays([{ a: 2 }], [{ a: 2 }]);
    expect(result).toBeTruthy();

    result = validateArrays([2], [2]);
    expect(result).toBeTruthy();

    result = validateArrays(
      [
        { test: [{ one: 2 }] },
      ], [
        { test: [{ one: 2 }] },
      ],
    );
    expect(result).toBeTruthy();

    result = validateArrays([1], [2]);
    expect(result).toBeFalsy();

    result = validateArrays([3], []);
    expect(result).toBeFalsy();

    result = validateArrays(
      [
        { test: [{ one: 2 }] },
      ], [
        { test: [{ two: 2 }] },
      ],
    );
    expect(result).toBeFalsy();

    result = validateArrays(
      [
        { test: [{ one: 5 }] },
      ], [
        { test: [{ two: 3 }] },
      ],
    );
    expect(result).toBeFalsy();
  });
});

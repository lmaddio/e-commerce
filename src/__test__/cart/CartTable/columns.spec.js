import columns from 'cart/CartTable/columns';

jest.mock('App/utils', () => ({
  addThousandsSeparator: val => val,
}));
jest.mock('cart/CartTable/Buttons/RemoveButton.container', () => 'RemoveButton');
jest.mock('cart/CartTable/CartTable.module.css', () => ({
  middleSizeCell: 'middleSizeCell',
}));
jest.mock('cart/utils', () => (component, props) => [component, props]);

const addThousandsSeparator = jest.fn();
const passPropsToComponent = jest.fn();
const RemoveButton = 'RemoveButton';
const styles = {
  middleSizeCell: 'middleSizeCell',
};

const EXPECTED_COLUMNS = [
  {
    title: 'Product',
    property: 'name',
  },
  {
    title: 'Price',
    property: 'price',
    format: price => (price ? `$${addThousandsSeparator(price)}` : '$0'),
  },
  {
    title: 'Count',
    property: 'quantity',
    format: quantity => (quantity ? addThousandsSeparator(quantity) : '0'),
    className: styles.middleSizeCell,
  },
  {
    title: 'Total',
    property: 'price',
    format: (price, data) => `$${addThousandsSeparator(data.quantity * price)}`,
  },
  {
    title: '',
    property: 'id',
    className: styles.middleSizeCell,
    format: id => passPropsToComponent(RemoveButton, { id, close: true }),
  },
];

describe('Columns', () => {
  it('Should match as string', () => {
    expect(JSON.stringify(columns)).toEqual(JSON.stringify(EXPECTED_COLUMNS));
  });

  it('Price don\' have a format function', () => {
    const COLUMN_INDEX = 0;
    expect(columns[COLUMN_INDEX].format).toEqual(undefined);
  });

  it('Should return the correct value for Price column', () => {
    const COLUMN_INDEX = 1;
    expect(columns[COLUMN_INDEX].format()).toEqual('$0');

    expect(columns[COLUMN_INDEX].format('2')).toEqual('$2');
  });

  it('Should return the correct value for Count column', () => {
    const COLUMN_INDEX = 2;
    expect(columns[COLUMN_INDEX].format()).toEqual('0');

    expect(columns[COLUMN_INDEX].format('5')).toEqual('5');
  });

  it('Should return the correct value for Total column', () => {
    const COLUMN_INDEX = 3;
    expect(columns[COLUMN_INDEX].format(2, { quantity: 5 })).toEqual('$10');
  });

  it('Should return the correct value for Total column', () => {
    const COLUMN_INDEX = 4;
    expect(
      columns[COLUMN_INDEX].format('idTest'),
    ).toEqual(
      [RemoveButton, { id: 'idTest', close: true }],
    );
  });
});

import { addThousandsSeparator } from 'App/utils';
import passPropsToComponent from '../utils';
import RemoveButton from './Buttons/RemoveButton.container';
import Input from './TableComponents/ModalInput';
import styles from './CartTable.module.css';

const HEADER_COLUMNS = [
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
    component: Input,
    className: styles.hoverable,
    format: quantity => (quantity ? addThousandsSeparator(quantity) : '0'),
  },
  {
    title: 'Total',
    property: 'price',
    format: (price, data) => `$${addThousandsSeparator(data.quantity * price)}`,
  },
  {
    title: '',
    property: 'id',
    format: id => passPropsToComponent(RemoveButton, { id, close: true }),
  },
];

export default HEADER_COLUMNS;

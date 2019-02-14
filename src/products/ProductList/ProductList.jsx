import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddCart from 'cart/AddCart';
import BadgeCart from 'cart/BadgeCart';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

export const NotFound = () => (<h2>Sorry, no products found.</h2>);
export const NoMoreProducts = ({ message }) => (
  <p style={{ textAlign: 'center', width: '100%' }}>
    <b>{message}</b>
  </p>
);

NoMoreProducts.defaultProps = {
  message: 'There are no more products to show',
};
NoMoreProducts.propTypes = {
  message: PropTypes.string,
};

export const Loading = () => (
  <div className={styles.loadingContainer}>
    <Spinner />
  </div>
);

const infiniteStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
};

class ProductList extends PureComponent {
  static setPagination(setPaginationCallback, page) {
    return () => setPaginationCallback(page);
  }

  static renderProducts(products) {
    return products.map((product) => {
      const availableForCart = product.available && product.quantity > 0;
      return (
        <ProductCard
          key={`productList.${product.id}`}
          availableForCart={availableForCart}
          Badge={BadgeCart}
          {...product}
        >
          <AddCart
            availableForCart={availableForCart}
            quantity={product.quantity}
            id={product.id}
          />
        </ProductCard>
      );
    });
  }

  render() {
    const {
      products, isLoading, pagination, setPagination, error,
    } = this.props;
    let Content = (<NotFound />);
    const { page, limit, lastPage } = pagination;
    const hasMore = !(
      error || (page === lastPage) || (page === 1 && (products.length % limit !== 0))
    );
    const endMessage = error === null ? undefined : error;
    if (isLoading && page === 1) {
      Content = (<Spinner />);
    } else if (products.length > 0) {
      Content = (
        <InfiniteScroll
          dataLength={products.length}
          next={ProductList.setPagination(setPagination, page + 1)}
          hasMore={hasMore}
          loader={<Loading />}
          style={infiniteStyles}
          endMessage={<NoMoreProducts message={endMessage} />}
        >
          {ProductList.renderProducts(products)}
        </InfiniteScroll>
      );
    }
    return (
      <div className={styles.ProductList}>
        { Content }
      </div>
    );
  }
}

ProductList.defaultProps = {
  products: [],
  error: null,
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      price: PropTypes.number,
      src: PropTypes.string,
      available: PropTypes.bool,
      sublevel_id: PropTypes.number,
      quantity: PropTypes.number,
      inCart: PropTypes.string,
    }),
  ),
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    lastPage: PropTypes.number,
  }).isRequired,
  setPagination: PropTypes.func.isRequired,
};

export default ProductList;

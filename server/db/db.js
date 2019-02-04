const categoriesJson = require('./categories.json');

const productsJson = require('./products.json');

module.exports = function () {
  return {
    categories: categoriesJson.categories,
    products: productsJson.products.map(product => Object.assign({}, {
      ...product,
      price: parseInt(product.price.replace('$', '').replace(',', ''), 10),
    })),
  };
};

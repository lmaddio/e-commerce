import Request from 'App/request';

const PRODUCTS_URL = '/products';
const productsRequest = new Request();

export default function getProducts(params) {
  return productsRequest.doGet({ url: PRODUCTS_URL, data: params, needAuth: true });
}

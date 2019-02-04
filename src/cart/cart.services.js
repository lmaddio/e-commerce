import Request from 'App/request';

const CART_URL = '/cart';
const cartRequest = new Request();

export default function getBuyConfirmation(items) {
  return cartRequest.doPost({ url: CART_URL, needAuth: true, data: items });
}

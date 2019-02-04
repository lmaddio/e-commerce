import Request from 'App/request';

const CATEGORIES_URL = '/categories';
const categoriesRequest = new Request();

export default function getCategories() {
  return categoriesRequest.doGet({ url: CATEGORIES_URL, needAuth: true });
}

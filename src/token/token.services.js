import Request from 'App/request';

const tokenRequest = new Request('/auth');

export default function renewToken() {
  const URL = '/renew';
  return tokenRequest.doGest({ url: URL, needAuth: true });
}

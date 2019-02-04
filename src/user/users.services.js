import Request from 'App/request';

const loginRequest = new Request();

export function logOut(userId) {
  const URL = '/auth/logout';
  return loginRequest.doPost({ url: URL, data: userId });
}

export function fetchUserProfile() {
  const URL = '/user/profile';
  return loginRequest.doGet({ url: URL, needAuth: true });
}

export function login(email, password) {
  const URL = '/auth/login';
  return loginRequest.doPost({ url: URL, data: { email, password } });
}

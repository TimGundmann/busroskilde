export const environment = {
  production: false,
  serviceHost: '',
  serviceHostUser: 'http://localhost:8080/users',
  serviceHostPlan: 'http://localhost:8081/plans',
  serviceHostNews: 'http://localhost:8082/news',
  authTokenName: 'Authorization',
  authHeaderName: 'Authorization',
  version: require('../../package.json').version
};

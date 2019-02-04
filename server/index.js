const path = require('path');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const users = require('./users');

const router = jsonServer.router(
  require(path.join(__dirname, 'db', 'db.js'))(),
);

const server = jsonServer.create();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

// VALIDATION
server.use(/^(?!\/auth).*$/, users.validateToken);

// USER
server.post('/auth/login', users.loginUser);
server.get('/user/profile', users.getProfile);

// CART
server.post('/cart', (req, res) => {
  res.status(200).json({
    message: 'Thanks for buying!',
  });
});

// DB
server.use(router);

server.listen(3005, () => {
  console.log('Running in 3005');
});

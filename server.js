const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router({
  users: require(path.join(__dirname, 'db.json')).users,
  userRecipes: require(path.join(__dirname, 'userRecipes.json')).userRecipes
});
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
module.exports = app =>
  [ 'all', 'get', 'companies', 'login', 'logout', 'register', 'delete', 'edit' ]
    .forEach(action => app.use(`/api/user/${action}`, require(`./${action}`)));
module.exports = app =>
  [ 'get', 'all', 'new', 'edit', 'delete', 'rate', 'comment', 'like', 'search' ]
    .forEach(action => app.use(`/api/company/${action}`, require(`./${action}`)));
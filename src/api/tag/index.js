module.exports = app =>
  [ 'all', 'use' ]
    .forEach(action => app.use(`/api/tag/${action}`, require(`./${action}`)));
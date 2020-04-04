const { User } = require('../../models');
const url = require('url');

module.exports = app => app.get('/api/lang/translate', (req, res) => {
  let lang = req.session.lang = +url.parse(req.url).query;

  let user = req.session.user;
  if(!user) res.send({
    socket: {
      event: 'update user',
      params: { user: null }
    }
  });
  else User.update({ lang }, { where: { id: user.id }})
    .then(() => res.send({
      socket: {
        event: 'update user',
        params: { user: { id: user.id } }
      }
    }));
});
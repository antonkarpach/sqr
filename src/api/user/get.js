const router = require('express').Router();
const multer = require('multer')();
const { User } = require('../../models');

router.get('/', (req, res) => {
  let user = req.session.user;
  let guest = { user: { guest: true }, lang: req.session.lang };

  if(!user) return res.send(guest);
  User.findOne({ where: { id: user.id }})
    .then(user => {
      if(!user) return res.send(guest);
      if(!user.isActive) {
        req.session.destroy();
        return res.send(guest);
      }
      req.session.user = user;
      let lang = user.lang;
      res.send({
        user,
        lang,
        socket: {
          event: 'auth',
          params: { id: user.id }
        }
      })
    })
});

router.post('/', multer.none(), (req, res) => {
  let user = req.session.user;
  if(!user) return res.send({ error: { id: 1 }});
  if(!user.isAdmin) return res.send({ error: { id: 4 }});
  User.findOne({ where: { id: req.body.id }})
    .then(user => {
      if(!user) return res.send({ error: { id: 5 }});
      user.getCompanies().then(companies => res.send({ user, companies: companies }))
    })
});

module.exports = router;
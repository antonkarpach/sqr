const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
  let user = req.session.user;
  if(!user) return res.send({ error: { id: 1 }});
  if(!user.isAdmin) return res.send({ error: { id: 4 }});
  User.findAll().then(users => res.send({ users }));
});

module.exports = router;
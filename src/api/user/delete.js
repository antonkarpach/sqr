const router = require('express').Router();
const multer = require('multer')();
const { User } = require('../../models');

router.post('/', multer.none(), (req, res) => {
  let user = req.session.user;
  if(!user) return res.send({ error: { id: 1 }});
  if(!user.isAdmin) return res.send({ error: { id: 4 }});
  User.findOne({ where: { id: req.body.id }})
    .then(user => user.destroy()
      .then(() => res.send({
        socket: {
          event: 'update user',
          params: { user: { id: req.body.id } }
        }
      })))
});

module.exports = router;
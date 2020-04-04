const router = require('express').Router();
const multer = require('multer')();
const { User } = require('../../models');

router.post('/', multer.none(), (req, res) => {
  let user = req.session.user;
  if(!user) return res.send({ error: { id: 1 }});
  let changes = JSON.parse(req.body.changes);
  if(!user.isAdmin && (changes.isActive !== undefined || changes.isAdmin !== undefined || user.id.toString() !== req.body.id)) return res.send({ error: { id: 4 }});
  User.update(changes, { where: { id: req.body.id }})
    .then(() => res.send({
      socket: {
        event: 'update user',
        params: { user: { id: req.body.id } }
      }
    }));
});

module.exports = router;
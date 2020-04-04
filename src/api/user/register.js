const router = require('express').Router();
const { User } = require('../../models');
const multer = require('multer')();

router.post('/', multer.none(), (req, res) => {
  req.body.firstName = req.body.username;
  User.findOne({ where: { username: req.body.username } }).then(user => {
      if(user) res.send({ warning: 'Пользователь с таким именем уже существует' });
      else User.findOne({ where: { email: req.body.email } }).then(user => {
        if(user) res.send({ warning: 'Эта эл. почта уже привязана к другому пользователю' });
        else User.count({ where: { isAdmin: true }}).then(n => {
          req.body.isAdmin = !n;
          User.create(req.body).then(user => res.send({ user: req.session.user = user }));
        });
      })
    });
});

module.exports = router;
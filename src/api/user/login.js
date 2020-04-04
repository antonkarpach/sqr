const router = require('express').Router();
const { User } = require('../../models');
const multer = require('multer')();
const bcrypt = require('bcrypt');

router.post('/', multer.none(), (req, res) => {
  let outsideUser = req.body['outside-user'] && JSON.parse(req.body['outside-user']);
  if(outsideUser) {
    let { outsideUserId, authType, firstName } = outsideUser;
    User.findOrCreate({
      where: { outsideUserId, authType, firstName },
      default: { outsideUserId, authType, firstName }
    }).then(user => res.send({ user: req.session.user = user[0] }));
  }

  else User.findOne({ where: {
      username: req.body.username,
      authType: null
    }}).then(user => {
      if(!user) res.send({ warning: 'Пользователя не существует' });
      else if(!bcrypt.compareSync(req.body.password, user.password)) res.send({ warning: 'Неверное имя пользователя или пароль' });
      else if(!user.isActive) res.send({ warning: 'Пользователь заблокирован' });
      else res.send({ user: req.session.user = user })
  });
});

module.exports = router;
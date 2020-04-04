const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
  let user = req.session.user;
  if(!user) return res.send({});
  User.findOne({ where: { id: user.id } })
    .then(user => user.getCompanies()
      .then(companies => res.send({ companies: companies })))
});

module.exports = router;
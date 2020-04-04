const router = require('express').Router();
const { Company } = require('../../models');
const multer = require('multer')();

router.post('/', multer.none(), (req, res) => {
  let user = req.session.user;
  if(!user) res.send({ error: { id: 1 } });
  else Company.findOne({ where: { id: req.body.companyId }})
    .then(company => {
      if(!user.isAdmin && user.id !== company.userId) res.send({ error: { id: 2 } });
      else company.update(req.body).then(() => res.send({}));
    });
});

module.exports = router;
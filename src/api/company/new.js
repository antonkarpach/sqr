const router = require('express').Router();
const { User } = require('../../models');
const multer = require('multer')();

router.post('/', multer.none(), (req, res) => {
  let user = req.session.user;
  if(!user) res.send({ error: { id: 1 } });
  else User.findOne({ where: { id: req.body.owner || user.id }})
      .then(user => {
        console.log(req.body);
        if(!user) res.send({ error: { id: 5 }});
        else user.createCompany(req.body)
          .then(company => res.send({ companyId: company.id }))
      })
});

module.exports = router;
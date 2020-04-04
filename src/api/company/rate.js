const router = require('express').Router();
const { Company } = require('../../models');
const multer = require('multer')();

router.post('/', multer.none(), (req, res) => {
  let user = req.session.user;
  if(!user) res.send({ error: { id: 1 } });
  else Company.findOne({ where: { id: req.body.companyId }})
    .then(company => {
        let ratings = JSON.parse(company.ratings), l = 0, s = 0;
        ratings[user.id] = req.body.rate;
        company.ratings = JSON.stringify(ratings);
        for(let rate in ratings) { s += +ratings[rate]; l++ }
        company.rating = s/l;
        company.save().then(() => res.send({}));
    });
});

module.exports = router;
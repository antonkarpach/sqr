const router = require('express').Router();
const { Company } = require('../../models');
const url = require('url');

router.get('*', (req, res) => {
  let user = req.session.user;
  let query = url.parse(req.url, true).query;
  if(query.access && !user) return res.send({ error: { id: 1 } });
  else Company.findOne({ where: { id: query.id }})
    .then(company => {
      if(!company) res.send({ error: { id: 3 } });
      else if(query.access && !user.isAdmin && user.id !== company.userId) res.send({ error: { id: 2 } });
      else company.getComments().then(comments => res.send({ company: company, comments }));
    })
});

module.exports = router;
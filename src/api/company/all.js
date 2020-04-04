const router = require('express').Router();
const { Company } = require('../../models');

router.get('/', (req, res) => {
  Company.findAll().then(companies => res.send({ companies: companies }));
});

module.exports = router;
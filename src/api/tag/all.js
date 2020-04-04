const router = require('express').Router();
const { Tag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll().then(suggestions => res.send({ suggestions }));
});

module.exports = router;
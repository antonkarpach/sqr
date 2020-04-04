const router = require('express').Router();
const { Tag } = require('../../models');
const multer = require('multer')();

router.post('/', multer.none(), (req, res) => {
  let user = req.session.user;
  if(!user) res.send({ error: { id: 1 } });
  else {
    JSON.parse(req.body.tags).forEach(tag => Tag.findOrCreate({ where: tag, defaults: tag }));
    res.send({});
  }
});

module.exports = router;
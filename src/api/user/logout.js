const router = require('express').Router();

router.get('/', (req, res) => {
  req.session.destroy();
  res.send({});
});

module.exports = router;
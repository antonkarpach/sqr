const router = require('express').Router();
const { Comment } = require('../../models');
const multer = require('multer')();

router.post('/', multer.none(), (req, res) => {
  let user = req.session.user;
  if(!user) res.send({ error: { id: 1 } });
  else Comment.findOne({ where: { id: req.body.commentId }})
    .then(comment => {
      let likes = JSON.parse(comment.likes);
      if(likes.includes(+user.id))
        likes.splice(likes.indexOf(+user.id), 1);
      else likes.push(+user.id);
      comment.likes = JSON.stringify(likes);
      comment.save().then(() => res.send({}));
    })
});

module.exports = router;
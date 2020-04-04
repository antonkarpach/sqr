const router = require('express').Router();
const multer = require('multer')();
const striptags = require('striptags');
const { Company } = require('../../models');

let finish = (companies, res) => {
  companies = companies
    .filter(w => {
      console.log(w.relevance);
      return w.relevance;
    })
    .sort((w2, w1) => {
      let diff = w1.relevance - w2.relevance;
      return diff ? diff : w1.rating - w2.rating;
    });
  res.send({ companies: companies });
};

router.post('/', multer.none(), (req, res) => {
  Company.findAll().then(companies => {
    if(!companies.length) res.send({ companies: [] });

    let processed = 0;
    const tags = JSON.parse(req.body.tags || '[]');
    const words = req.body.query.split(' ');
    const speciality = req.body.speciality;

    companies.forEach(company => {
      company.relevance = 0;
      const companyTags = JSON.parse(company.tags).map(tag => tag.text);

      if(speciality === company.speciality.toString()) company.relevance += 15;
      tags.forEach(tag => {
        if(~companyTags.indexOf(tag.text)) company.relevance += 10;
      });

      words.forEach(word => {
        if(!word) return (++processed === companies.length * words.length) ?
            finish(companies, res) : null;
        if(~striptags(company.text).indexOf(word)) company.relevance += 2;
        if(~companyTags.indexOf(word)) company.relevance += 7.5;
        if(~company.name.indexOf(word)) company.relevance += 20;
        company.getComments().then(comments => {
            if (comments) comments.map(comment => comment.text).forEach(comment => {
              if(~comment.indexOf(word)) company.relevance += 1;
            });
            if(++processed === companies.length * words.length) finish(companies, res);
          });
      });
    });
  });
});

module.exports = router;
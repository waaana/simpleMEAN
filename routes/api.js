var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

/*router.get('/product',(req, res) => {
    res.send('get send product list');
});
router.get ('/product/:id', (req,res) => {
    res.send ('get details for product: ' + req.params.id);
});*/

router.get('/articles', (req, res, next) => {
    Article.find((err, articles)=> {
        if (err) {
            return res.send(500, err);
        }
        return res.send(articles);
    })
});

router.get('/articles/:id', (req, res, next) => {
    Article.findById(req.params.id, (err,article) =>{
        if (err) {
            res.send(err);
        }
        res.json(article);
    })
});

router.post('/articles/', (req, res, next) => {
   var article = new Article();
   article.username = req.body.username;
   article.title = req.body.title;
   article.text = req.body.text;
   article.save((err, article) =>{
       if (err) {
           return res.send(500,err);
       }
       return res.json(article);
   })
});

/*router.put('/articles/:id', (req, res, next) => {
    res.end('Updates the details of article with id: ' + req.params.id + ' in the database');
});*/


module.exports = router;

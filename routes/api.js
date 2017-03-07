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

router.use('/articles', (req, res, next) => {
    if(req.method === 'GET') {
        return next();
    }
    else if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.send({status: 'Authentication Failure'});
    }
});

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

router.delete('/articles/:id', (req, res, next) => {
    Article.remove({_id: req.params.id}, (err, article) => {
        if (err) {
            return res.send(err);
        }
        res.json({message: 'Successfully deleted'});
    })
});

router.put('/articles', (req, res, next) => {
    Article.findOne({_id: req.body._id}, (err, article) =>{
        if (err) {
            return res.send(err);
        }
        article.username = req.body.username;
        article.title = req.body.title;
        article.text = req.body.text;
        article.timestamp = req.body.timestamp;
        article.save(err => {
            if (err) {
                return res.send(err);
            }
            res.json({message: 'article updated'});
        })
    })
})

/*router.put('/articles/:id', (req, res, next) => {
    res.end('Updates the details of article with id: ' + req.params.id + ' in the database');
});*/


module.exports = router;

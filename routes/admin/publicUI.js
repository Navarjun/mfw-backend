var express = require('express');
var router = express.Router();
var Model = require('../../models/magikDB/MagikDB');

router.use('/*', function(req, res, next) {
    Model.navigation.get()
        .then(function(navOptions) {
            if (navOptions && Array.isArray(navOptions)) {
                const options = navOptions.sort((a, b) => a-b);
                req.navOptions = options;
                next();
            } else {
                throw 'No navigation options set';
            }
        }).catch(function(err) {
            res.status(err.code || 500).send({ message: err.message || 'Server Error' });
        });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('container/archive');
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

router.get('/:type/:uri', function (req, res, next) {
    const type = req.params.type;
    const uri = req.params.uri;

    switch (type) {
    case 'container':
        Model.container.findByUri(uri)
            .then(function (container) {
                if (container) {
                    res.render('interface/container', {navOptions: req.navOptions, container: container, title: container.title});
                } else {
                    res.status(404);
                    next();
                }
            }).catch(function(err) {
                res.status(err.code || 500).send({ message: err.message || 'Server Error' });
            });
        break;
    case 'page':
        Model.page.findByUri(uri)
            .then(function (page) {
                if (page) {
                    page.content = decodeURIComponent(page.content).replaceAll('&lt;', '<').replaceAll('&gt;', '>');
                    res.render('interface/page', {navOptions: req.navOptions, page: page, title: page.title});
                } else {
                    res.status(404);
                    next();
                }
            }).catch(function(err) {
                res.status(err.code || 500).send({ message: err.message || 'Server Error' });
            });
        break;
    case 'blog':
            Model.blog.findByUri(uri)
                .then(function(blog) {
                    if (blog) {
                        Model.post.findByBlogId(blog._id, 10, 0, '-content')
                            .then(function (posts) {
                                console.log(posts.length);
                                res.render('interface/blog', {navOptions: req.navOptions, posts: posts, blog: blog, title: blog.title});
                            }).catch(function (err) {
                                res.status(err.code || 500).send({ message: err.message || 'Server Error' });
                            });
                    } else {
                        res.status(404).send({ message: 'Requested blog not found' });
                    }
                }).catch(function (err) {
                    res.status(err.code || 500).send({ message: err.message || 'Server Error' });
                });
            break;
    default:
        res.status(200).send({message: `No entity of ${type} exists`});
    }
});

router.get('/blog/:bloguri/post/:posturi', function(req, res) {
    console.log('wow');
    const blogUri = req.params.bloguri || 'blog';
    const postUri = req.params.posturi || 'new-post';
    Model.blog.findByUri(blogUri)
        .then(function(blog) {
            if (blog) {
                Model.post.getByBlogIdAndUri(blog._id, postUri)
                    .then(function (post) {
                        post.content = decodeURIComponent(post.content).replaceAll('&lt;', '<').replaceAll('&gt;', '>');
                        res.render('interface/post', {navOptions: req.navOptions, post: post, blog: blog, title: post.title});
                    }).catch(function (err) {
                        res.status(err.code || 500).send({ message: err.message || 'Server Error' });
                    });
            } else {
                res.status(404).send({ message: 'Requested blog not found' });
            }
        }).catch(function (err) {
            res.status(err.code || 500).send({ message: err.message || 'Server Error' });
        });
});

module.exports = router;

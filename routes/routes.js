const Post = require('../models/post');
const mongoose =require('mongoose');

module.exports = (app) => {
  app.post('/api/newpost', (req, res, next) => {
    const newpost = req.body;
    Post.create(newpost)
      .then((post) => {
        res.send(post);
      })
      .catch(next);
  });
  app.get('/api', (req, res, next) => {
    Post.find((err, a) => {
      const post = [];
      a.forEach((b) => {
        post.push(b);
      });
      res.send({ post });
    })
    .catch(next);
  });
  app.put('/api/post/:id', (req, res, next) => {
    const postId = req.params.id;
    const editpost = req.body;
    Post.findByIdAndUpdate({ _id: postId }, editpost)
      .then(() => Post.findById({ _id: postId }))
      .then(post => res.send(post))
      .catch(next);
  });
  app.delete('/api/post/:id', (req, res, next) => {
    const postId = req.params.id;
    Post.findByIdAndRemove({ _id: postId })
      .then(post => res.status(204).send(post))
      .catch(next);
  });
}

var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', function (req, res) {
  db.getUsers(req.app.get('connection'))
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/index', function (req, res) {
  const conn = req.app.get('connection')
  const user = {
    name: req.body.name,
    email: req.body.email
  }
  db.addUser(user, conn)
    .then(addProfile)
    .then(res.redirect('/'))
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })

  function addProfile (insertedIds) {
    const profile = {
      user_id: insertedIds[0],
      name: req.body.name,
      email: req.body.email
    }
    return db.addProfile(profile, conn)
  }
})

router.get('/profile/:id', function (req, res) {
  const id = Number(req.params.id)
  db.getUser(id, req.app.get('connection'))
    .then(function (result) {
      const viewData = result[0]
      res.render('profiles', viewData)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/posts', function (req, res) {
  db.getPosts(req.app.get('connection'))
    .then(function (posts) {
      res.render('posts', { posts: posts })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router

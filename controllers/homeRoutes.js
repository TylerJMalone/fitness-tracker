const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage')
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  
  res.render('signup');
});

router.get('/exercises', withAuth, async (req, res) => {
    res.render('exercises');
});

router.get('/caloricNeeds', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('caloricNeeds', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { User, Favorite } = require('../models');
const withAuth = require('../utils/auth');

//get homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
      res.status(500).json(err);
  }
});

//get signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  
  res.render('signup');
});

//get login page
router.get('/login', (req, res) => {
  res.render('login');
})

//get exercises page
router.get('/exercises', withAuth, async (req, res) => {
  res.render('exercises', {
      logged_in: req.session.logged_in,
    });
});

//get caloricNeeds page
router.get('/caloricNeeds', withAuth, async (req, res) => {
  res.render('caloricNeeds', {
    logged_in: req.session.logged_in,
  });
});

//get favorites page
router.get('/favorites', withAuth, async (req, res) => {
  try {
    const favData = await Favorite.findAll({ where: { user_id: req.session.user_id } });

    const favorites = favData.map((favorite) => favorite.get({ plain: true }));

    res.render('favorites', {
      favorites,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;

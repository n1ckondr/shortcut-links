const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const baseURL = config.get('baseURL');
    const {from} = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({from});

    if (existing) {
      return res.json({link: existing});
    }

    const to = baseURL + '/t/' + code;

    const link = new Link({
      code, to, from, owner: req.user.userId
    });

    await link.save();

    return res.status(201).json({link});

  } catch (e) {
    return res.status(500).json({
      message: 'Что-то пошло не так! Попробуйте ещё раз!'
    });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId});
    return res.json(links);

  } catch (e) {
    return res.status(500).json({
      message: 'Что-то пошло не так! Попробуйте ещё раз!'
    });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    return res.json(links);

  } catch (e) {
    return res.status(500).json({
      message: 'Что-то пошло не так! Попробуйте ещё раз!'
    });
  }
});

module.exports = router;

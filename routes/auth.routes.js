const {Router} = require('express');
const bcryptjs = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

const SALT = 12;

// Authorization - /api/auth/..

// Sigh Up
router.post(
  '/register',
  [
    check('email', 'Неверный e-mail!').isEmail(),
    check('password', 'Минимальная длина пароля - 6 символов!')
      .isLength({min: 6})
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Неверные данные (Регистрация)!'
        });
      }

      const {email, password} = req.body;

      const person = await User.findOne({email});

      if (person) {
        return res.status(400).json({
          message: 'Пользователь с таким e-mail уже существует!'
        });
      }

      const hashedPassword = await bcryptjs.hash(password, SALT);
      const user = new User({email, password: hashedPassword});

      await user.save();

      return res.status(201).json({message: 'Пользователь был создан!'});

    } catch (e) {
      return res.status(500).json({
        message: 'Что-то пошло не так! Попробуйте ещё раз!'
      });
    }
  });

// Log In
router.post(
  '/login',
  [
    check('email', 'Введите корректный e-mail!')
      .normalizeEmail().isEmail(),
    check('password', 'Введите пароль!').exists()
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Неверные данные (Вход)!'
        });
      }

      const {email, password} = req.body;

      const user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден!'});
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      console.log(isMatch);

      if (!isMatch) {
        return res.status(400).json({message: 'Пароль неверен!'});
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtKey'),
        {expiresIn: '1h'}
      );

      return res.json({token, userId: user.id, email});

    } catch (e) {
      return res.status(500).json({
        message: 'Что-то пошло не так! Попробуйте ещё раз!'
      });
    }
  });


module.exports = router;

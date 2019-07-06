const knex = require("../db/client");
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const User = require("../models/users");
const saltRounds = 10;

const validateUser = (requestBody, response) => {
let { username, email, password, password_digest } = requestBody.users
const schema = Joi.object().keys({
    users: {
      username: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().valid(password_digest).required(),
      password_digest: Joi.string().required()
    }
  })

  const result = Joi.validate(requestBody, schema, (err) => {
    if (err) {
      console.log('err: ', err);
      response.status(422).json({
        error: `${err.details[0].message}`,
      })
    }
    return err
  })
  return result;
}

module.exports = {
  async show(req, res, next) {
    try {
      const { id } = req.params 
      const user = await User.findById(req.session.userId);

      res.status(200).json({user});
    } catch (error) {
      next(error)
    };
  },
  async create(req, res, next) {
    const valid = validateUser(req.body, res);
    if (valid === null) {
      try {
        const { username, email, password, password_digest } = req.body.users;
        const verify = await User.findByEmail(email)
        let user;
        if (verify.length === 0) {
          user = new User({username, email, password, password_digest})
          const newUser = await user.save()
          res.status(200).json(newUser);
        } else {
          res.status(422).json({error: "email already in use"})
        }
      } catch (error) {
        next(error);
      }
    }
  }
};
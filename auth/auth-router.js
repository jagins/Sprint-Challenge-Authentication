const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('../users/user-model');

router.post('/register', (req, res) => {
  const user = req.body;

  if(!user.username && !user.password)
  {
    res.status(400).json({message: 'please provide a username and password'});
  }
  else
  {
    const hashPassword = bcrypt.hashSync(user.password, 8);

    user.password = hashPassword;

    Users.addUser(user)
    .then(createdUser =>
    {
      res.status(200).json(createdUser);
    })
    .catch(error =>
    {
      res.status(500).json({error: 'could not save to the database'});
    })
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;

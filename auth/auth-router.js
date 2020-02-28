const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      res.status(201).json(createdUser);
    })
    .catch(error =>
    {
      res.status(500).json({error: 'could not save to the database'});
    })
  }
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  Users.findUser({username}).first()
  .then(user =>
  {
    if(user && bcrypt.compareSync(password, user.password))
    {
      const token = createToken(user)

      res.status(200).json({message: `Welcome ${user.username}`, token});
    }
    else
    {
      res.status(400).json({error: 'username or password is invalid'});
    }
  })
})

function createToken(user)
{
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: '1hr'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;

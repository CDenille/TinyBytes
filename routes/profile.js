const PORT = 8080;
const router = require('express').Router();
const {User} = require('../db/associations');
const basicAuth = require('express-basic-auth');
const auth = require ('../routes/auth')

router.use(basicAuth({
    authorizer : auth,
    authorizeAsync: true,
    challenge: true,
    realm: 'foo',
    unauthorizedResponse : () => "You do not have access to this content. Please log in"
}))

router.put('/generateApi',async (req,res)=>{
  const email = req.body.email
  try {
    const user = await User.findOne({where: {email: email}});
    const key = `APIKEY${user.id}`
    user.update({apiKey:key,developer:1})
    console.log('API key added ', key)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    if (user) {
      const context = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        developer: user.developer,
        apiKey: user.apiKey,
      };
      res.status(200).json(context);
    } else {
      res.redirect(404).send(`No current user exist by this userId: ${req.params.userId}.`);
    }
  } catch (error) {
    res.status(500).send(`Server error, please try again at a later time. Error: ${error}`);
  }
});

router.post('/:userId', async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    if (user) {
      user.set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      });
      if (req.body.password) {
        user.set({password: req.body.password});
      }
      res.status(200).send(`Profile information was successfully updated for ${req.body.firstName} ${req.body.lastName}.`);
    } else {
      res.status(409).send(`No current user exist by this userId: ${req.params.userId}.`);
    }
  } catch (error) {
    res.status(500).send(`Could not update the profile information for ${req.body.firstName} ${req.body.lastName}. This is due to the following server error: ${error}`);
  }
});

//delete User profile
router.delete('/:userId', async (req, res) => {
  let id = req.params.userId
  console.log('Heres the id', id);
  let userToDelete = await User.findByPk(id)
  console.log(userToDelete)
    await userToDelete.destroy()
    res.send('User deleted')
})

module.exports = router;

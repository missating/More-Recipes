import User from '../controllers/controlUsers';


const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to more-recipes api');
  });
  app.post('/api/users/signup', User.createUser);
  app.post('/api/users/signin', User.userLogin);
};

export default router;


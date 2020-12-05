import * as express from 'express';

import UserCtrl from './controllers/user';
import ProductCtrl from './controllers/product';

function setRoutes(app): void {
  const router = express.Router();
  const productCtrl = new ProductCtrl();
  const userCtrl = new UserCtrl();

  // Products
  router.route('/product').get(productCtrl.getAll);
  router.route('/product/:id').get(productCtrl.get);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;

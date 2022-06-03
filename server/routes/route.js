const routes = require("express").Router();
const controller = require("../controller/controller");

//first route
routes
  .route("/api/categories")
  .post(controller.create__Categories)
  .get(controller.get__Categories);

//calling create__Transaction from controller class
routes
  .route("/api/transaction")
  .post(controller.create__Transaction)
  .get(controller.get__Transaction)
  .delete(controller.delete__Transaction);

routes.route("/api/labels").get(controller.get__Labels);

module.exports = routes;

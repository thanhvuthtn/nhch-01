const userRouter = require("express").Router();
const userController = require("../controllers/userController");

//Router
//addnew
userRouter.post("/addnew", userController.AddNew);
//GetAll
userRouter.get("/index", userController.GetAll);

//export
module.exports = userRouter;

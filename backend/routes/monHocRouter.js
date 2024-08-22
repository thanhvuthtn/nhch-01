const monHocRouter = require("express").Router();
const monHocController = require("../controllers/monhocController");

//index
monHocRouter.get("/index", monHocController.GetAll);
//addnew
monHocRouter.post("/addnew", monHocController.AddNew);
//delete
monHocRouter.post("/delete", monHocController.DeleteMonHoc);
//Update
monHocRouter.post("/update", monHocController.UpdateMonHoc);
module.exports = monHocRouter;

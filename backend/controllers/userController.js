//Add Bcrypt
const bcrypt = require("bcrypt");
//Model User
const User = require("../models/user");
//User Controller
const userController = {
  //-------------------------------------
  //Thêm user
  //-------------------------------------
  AddNew: async (req, res) => {
    try {
      bcrypt
        .hash(req.body.password, 10)
        .then((hashed) => {
          const newUser = new User({
            userName: req.body.userName,
            hoTen: req.body.hoTen,
            password: hashed,
            monHoc: req.body.monHoc || null,
          });
          newUser
            .save()
            .then((user) => {
              delete user["password"];
              const NewUser = {
                _id: user._id,
                userName: user.userName,
                hoTen: user.hoTen,
                quyen: user.quyen,
                monHoc: user.monHoc,
              };
              res.status(200).json(NewUser);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        })
        .catch((err) => console.log(err.message));
    } catch (err) {
      res.status(501).json(err.message);
    }
  },
  //------------------------------------
  //Get all
  //-------------------------------------
  GetAll: async (req, res) => {
    try {
      const users = await User.find({}).select("userName hoTen quyen monHoc");
      res.status(200).json(users);
    } catch {
      res.status(501).json(err.message);
    }
  },
};
module.exports = userController;

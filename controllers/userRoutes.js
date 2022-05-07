const express = require ("express");
const router = express.Router();
const {User, Blog} = require("../models");
const bcrypt = require("bcrypt");

// find all users 
router.get("/", (req, res) => {
    User.findAll({
        include: [Blog]
    })
    .then(dbUsers => {
        res.json(dbUsers);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "an error has occured, err"})
    });
});
// find one user 
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id,{})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

// create a user 
router.post("/", (req, res) => {
    // creates a new user
    User.create(req.body)
    // enters a new session using that user's name and id 
      .then(newUser => {
        req.session.user = {
          id:newUser.id,
          username:newUser.username
        }
        res.json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });
//matches username to one in the database 
  router.post("/login", (req, res) => {
    //   find if there is any username thate matches the inputed username
    User.findOne({
      where:{
      username:req.body.username
    }
  }).then(foundUser=>{
    //if the username does not match any usernames then send message
      if(!foundUser){
        return res.status(400).json({msg:"wrong login credentials"})
      }
    //if password is the same as the encrypted password then login
      if(bcrypt.compareSync(req.body.password,foundUser.password)){
        req.session.user = {
          id:foundUser.id,
          username:foundUser.username
        }
        return res.json(foundUser)
      } else {
        //if wrong password then send the extact same message as wrong username
        return res.status(400).json({msg:"wrong login credentials"})
      }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

//   update user 
router.put("/:id", (req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
  });

//   delete a user 
router.delete("/:id", (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(delUser => {
      res.json(delUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
  });

// to logout of the session
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
  })
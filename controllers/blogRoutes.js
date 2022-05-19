const express =require ("express");
const router = express.Router();
const {User, Blog, Comment} = require ("../models");

// Find all blogs 
router.get("/", (req,res) => {
    Blog.findAll({ 
      include:Comment
    })
    .then (dbBlogs => {
      console.log(dbBlogs)
        res.json(dbBlogs);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json ({msg: "an error has occured", err})
    });
});

//find one specific blog 
router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id,{})
      .then(dbBlog => {
        res.json(dbBlog);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

// create a new blog 
router.post("/", (req, res) => {
    // if use is not logged in return this response
    if(!req.session.user){
      return res.status(401).json({msg:"You have to log in to use me!"})
  }
    Blog.create({
        // take in the information of the parameters
      title:req.body.title,
      body:req.body.body,
      UserId:req.session.user.id
    })
    // json the response to create a new blog 
      .then(newBlog => {
        res.json(newBlog);
      })
    //   if creating the blog does not return this error
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

//Update a Blog 
router.put("/:id", (req, res) => {
    Blog.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedBlog => {
      res.json(updatedBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
  });

//delete a Blog
router.delete("/:id", (req, res) => {
    Blog.destroy({
      where: {
        id: req.params.id
      }
    }).then(delBlog => {
      res.json(delBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
  });

  router.post("/comment", (req, res) => {
    // if use is not logged in return this response
    if(!req.session.user){
      return res.status(401).json({msg:"You have to login to use me!"})
  }
    Comment.create({
      // take in the information of the parameters
    blogId:req.body.id,
    body:req.body.body,
    userId:req.session.user.id
  })
  // json the response to cereate a new blog 
    .then(newComment => {
      console.log(newComment)
      res.json(newComment);
    })
    
  //   if creating the blog does not return this error
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
    
})
  module.exports = router;
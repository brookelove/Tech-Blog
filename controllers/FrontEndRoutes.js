const express = require('express');
const router = express.Router();
const {User,Blog, Comment} = require('../models');

router.get("/",(req,res)=>{
    Blog.findAll({
        include: [Comment]
    }).then(blogs, comments =>{
        console.log(blogs)
        console.log(comments)
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))
        const hbsComments = comments.get({plain:true});
        console.log("==========")
        console.log(hbsBlogs)
        console.log(hbsComments)
        const loggedIn = req.session.user?true:false
        res.render("home",{blogs:hbsBlogs,loggedIn,username:req.session.user?.username, Comment:hbsComments})
    })
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id,{
        include:[Blog]
    }).then(userData=>{
        console.log(userData);
        const hbsData = userData.get({plain:true})
        console.log("=======")
        console.log(hbsData);
        hbsData.loggedIn = req.session.user?true:false
        res.render("profile",hbsData)
    })
})

module.exports = router;
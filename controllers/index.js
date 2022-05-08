const express = require ("express");
const router = express.Router();

// creating route to search for user routeson on server side 
const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes)

// creating route to search for blog routes on server side 
const blogRoutes = require ("./blogRoutes");
router.use("/api/blogs", blogRoutes)

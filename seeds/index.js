const sequelize = require("../config/connection")
const {User,Blog} = require("../models")

const users = [
    {
        username:"willow",
        password:"password"
    },
    {
        username:"bronx",
        password:"password1"
    },
    {
        username:"oxford",
        password:"Password1"
    }
]

const blogs = [
    {
        title:"i like to chew on shoes ",
        body:"My mom's shoes are yummy!",
        userId:1
    },
    {
        title:"I like to watch my sister get in trouble",
        body:"I love my sister but it is funny when she gets in trouble because that means mom gives me more belly rubs ",
        userId:1
    },
    {
        title:"I love naps",
        body:"Napping is the most imprtant meal of the day",
        userId:2
    }
]

const startup = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

startup()
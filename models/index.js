const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");
User.hasMany(Blog);
Blog.belongsTo(User);

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

module.exports = {
    User, 
    Blog,
    Comment
}

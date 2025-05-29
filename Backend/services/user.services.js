const userModel = require('../models/user.model');
const blogModel = require('../models/blog.model');

//This will create a new user in the database
module.exports.createUser = async ({
    firstname,
    lastname,
    email,
    password,
}) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
    });

    return user;
};

//This will create a new blog in the database
module.exports.createBlog = async ({
    title,
    content,
    author,
    image, // Accept image URL
}) => {
    if (!title || !content || !author) {
        throw new Error('All fields are required');
    }

    const blog = blogModel.create({
        title,
        content,
        author,
        image, // Save image URL/path to the database
    });

    return blog;
};

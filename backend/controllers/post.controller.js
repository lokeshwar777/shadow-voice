// TODO
const getAllPosts = async (req, res) => {
    res.json({ message: 'GET all posts' });
};

// TODO
const getPostById = async (req, res) => {
    res.json({ message: 'GET post by ID' });
};

// TODO
const createPost = async (req, res) => {
    console.log('req', req.body);
    res.json({ message: 'POST new post' });
};

// TODO
const updatePost = async (req, res) => {
    res.json({ message: 'PUT update post' });
};

// TODO
const deletePost = async (req, res) => {
    res.json({ message: 'DELETE post' });
};

export { createPost, deletePost, getAllPosts, getPostById, updatePost };

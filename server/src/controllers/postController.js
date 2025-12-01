const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
const getPosts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (category) {
      query.category = category;
    }

    const posts = await Post.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new post
// @route   POST /api/posts
const createPost = async (req, res) => {
  try {
    const { title, content, category, slug } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Please add all fields' });
    }

    const post = await Post.create({
      title,
      content,
      category,
      slug,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the post author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await post.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
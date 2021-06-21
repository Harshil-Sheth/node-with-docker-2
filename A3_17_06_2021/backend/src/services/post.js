import Post from '@app/models/post';
import Logger from '@app/utils/logger';
import User from '@app/models/user';

import { validationResult } from 'express-validator/check';
const logger = new Logger('Controller', 'post.js');

const getAllPost = async (req) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate('author')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return { totalItems, posts };
  }
  catch (err) {
    logger.error(err);

    return false;
  }
};
const getPostById = async (req) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    return post;

  }
  catch (err) {
    logger.error(err);

    return false;
  }
};
const createPosts = async (req) => {
  try {
    const { title, content } = req?.body;

    const post = new Post({
      title,
      content,
      author: req.userId,
    });
    const posts = await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();
    // return posts;

    return posts;
  }
  catch (err) {
    logger.error(err);

    return false;
  }
};

const updateThePost  = async(req)=>{
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const { title, content } = req?.body;

  try {
    const post = await Post.findById(postId).populate('author');
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.author._id.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    post.title = title;
    post.content = content;
    const result = await post.save();

    return result;
  }
  catch (err) {
    logger.error(err);

    return false;
  }
};

const deleteThepost= async(req)=>{
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.author.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
  }
  catch (err) {
    logger.error(err);
    throw new Error(`deleteOneuserpostsave Err: ${err}`);
  }
};


export { getAllPost, createPosts, getPostById, updateThePost, deleteThepost };

import fs from 'fs';
import path from 'path';
import { getAllPost, createPosts,getPostById,updateThePost, deleteThepost } from '@app/services/post';

const clearImage = (filePath) => {
  let fP = filePath;
  fP = path.join(__dirname, '..', filePath);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.unlink(fP, (err) => console.log(err));
};

const getPosts = async (req, res, next) => {
  try {
    const { totalItems, posts } = await getAllPost(req);

    res.status(200).json({
      message: 'posts fetched',
      posts: await posts,
      totalItems: await totalItems,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const posts = await createPosts(req);
    res.status(201).json({
      message: 'Post created successfully!',
      posts,
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getPost = async (req, res, next) => {
  const post = await getPostById(req);
  try {
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Post fetched.', post });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updatePost = async (req, res, next) => {

  try {
    const result = await updateThePost(req);
    res.status(200).json({ message: 'Post updated!', post: result });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    await deleteThepost(req);
    res.status(200).json({ message: 'Deleted post.' });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export { getPosts, createPost, getPost, updatePost, deletePost };

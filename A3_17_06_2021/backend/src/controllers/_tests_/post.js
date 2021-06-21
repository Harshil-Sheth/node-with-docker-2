import { describe } from 'jest-circus';
import { createPosts, getPostById, updateThePost, deleteThepost } from '@app/services/post';
import { createPost, getPost, updatePost, deletePost } from '@app/controllers/post';

jest.mock('@app/services/post');

describe('create post',()=>{
  test('createpost', (done) => {
    createPosts.mockImplementation(() => 'valid');
    const req = {
      body: {
        title: 'wings',
        content: 'the wings of fire'
      }
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input.message === 'Post created successfully!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };
    createPost(req, res);
  });

  //getpostbyid

  test('getpostbyid', (done) => {
    getPostById.mockImplementation(() => 'valid');
    const req = {
      params: {
        id: '60cc6b40254cf4003b9bf711'
      }
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input.message ==='Post fetched.') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {
      },
    };
    getPost(req, res);
  });

  //updateposbyid
  test('updatepostbyid', (done) => {

    updateThePost.mockImplementation(() => 'valid');

    const req = {
      params: {
        postId: '60cc602422d319003c83dcab'
      },
      body:{
        title:'hello',
        content:'world'
      }
    };

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.message ==='Post updated!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {
      },
    };
    updatePost(req, res);
  });

  //deletepostbyid
  test('deletepostbyid', (done) => {

    deleteThepost.mockImplementation(() => 'valid');

    const req = {
      params: {
        postId: '60cc6b40254cf4003b9bf711'
      },
      userId:'60cb3fa8d0bc24003bdfc16b'
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input.message ==='Deleted post.') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => {
        // myHeaders.append("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwY2M0ZDgzY2U0ZWE1MDAzY2VkZTEzNiIsImlhdCI6MTYyNDA3NDkyMSwiZXhwIjoxNjI0MDgyMTIxfQ.P26Y18L2FY25oeOYFFLuxEmKB7Cl1q-WuVac1bxoAFY");
      }
    };
    deletePost(req, res);
  });
});
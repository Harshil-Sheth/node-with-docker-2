import { storeUserImage, registerUser, loginUser } from '@app/controllers/user';
import { putImage, register, login } from '@app/services/user';
jest.mock('@app/services/user');

describe('storeUserImage', () => {

  test('email password required', (done) => {

    putImage.mockImplementation(() => null);

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.ok === true) {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };

    Buffer.from = () => ({
      toString: () => 'bb'
    });
    const req = {
      params: {
        id: '123'
      },
      files: {
        a: { data: 'b'}
      }
    };

    storeUserImage(req, res);

  });
});

describe('loginUser', () => {

  test('email password required', (done) => {

    const req = {
      body: {
        email: '',
        password: ''
      }
    };

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.err === 'Email and Password are required') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };
    loginUser(req, res);
  });

  test('failed login', (done) => {

    login.mockImplementation(() => null);

    const req = {
      body: {
        email: 'myEmail',
        password: 'password'
      }
    };

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.err === 'Login failed!') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };
    loginUser(req, res);
  });

  test('Auth success', (done) => {

    login.mockImplementation(() => 'valid');

    const req = {
      body: {
        email: 'myEmail',
        password: 'password'
      }
    };

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {

        if (input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: function () {


        return this;
      },
    };
    loginUser(req, res);
  });
});

describe('RegisterUser', () => {
  //registration

  test('failed registration', (done) => {

    register.mockImplementation(() => null);
    const req = {
      body: {
        email: 'myEmail',
        password: 'password'
      }
    };
    const res = {
      status: function () {
        return this;
      },
      json: (input = {}) => {
        if (input.status === 'ok') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };
    registerUser(req, res);
  });


  test('email password required', (done) => {

    const req = {
      body: {
        email: '',
        password: ''
      }
    };

    const res = {
      status: function () {

        return this;
      },
      json: (input = {}) => {
        if (input.err === 'Email and Password are required') {
          done();
        }
        else {
          done(new Error('Was expecting different input'));
        }
      },
      header: () => { },
    };
    registerUser(req, res);
  });
});

// describe('getUsers',()=>{
//   test('getUser',(done)=>{
//     getAll.mockImplementation(()=> 'valid');
//     const req = {
//     };
//     const res = {
//       status: function () {
//         return this;
//       },
//       json: (input = {}) => {
//         if (input.message === 'ok') {
//           done();
//         }
//         else {
//           done(new Error('Was expecting different input'));
//         }
//       },
//       header: function () {
//         return this;
//       },
//     };
//     getUser(req, res);
//   });
//   test('getUserById',(done)=>{
//     findById.mockImplementation(()=> 'valid');
//     const req = {
//       params: {
//         id: '60cb3fa8d0bc24003bdfc16b'
//       }
//     };
//     const res = {
//       status: function () {
//         return this;
//       },
//       json: (input = {}) => {
//         if (input.status === 'ok') {
//           done();
//         }
//         else {
//           done(new Error('Was expecting different input'));
//         }
//       },
//       header: function () {
//         return this;
//       },
//     };
//     findUserById(req, res);
//   });
// });
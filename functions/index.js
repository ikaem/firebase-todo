require('dotenv').config();
const functions = require('firebase-functions');
const app = require('express')();

// TODO this could easily be a normal express app

// exports.helloworld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase');
// });

const auth = require('./util/auth');

const {
  getAllTodos,
  postOneTodo,
  deleteTodo,
  // loginUser,
} = require('./APIs/todos');

const {
  loginUser,
  signupUser,
  uploadProfilePhoto,
  getUserDetails,
  updateUserDetails,
} = require('./APIs/users');

// we can do this as well, instead of calling it in each route
// app.use(auth)

// TODO set the route here
app.get('/todos', auth, getAllTodos);
app.post('/todo', auth, postOneTodo);
app.post('/login', auth, loginUser);
app.post('/signup', auth, signupUser);
app.delete('/todo/:todoId', auth, deleteTodo);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetails);
app.put('/user', auth, updateUserDetails);

// console.log('this', loginUser);

// export the api
exports.api = functions.https.onRequest(app);

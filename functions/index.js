const functions = require('firebase-functions');
const app = require('express')();

// TODO this could easily be a normal express app

// exports.helloworld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase');
// });

const {
  getAllTodos,
  postOneTodo,
  deleteTodo,
  // loginUser,
} = require('./APIs/todos');

const { loginUser, signupUser } = require('./APIs/users');

// TODO set the route here
app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.post('/login', loginUser);
app.post('/signup', signupUser);
app.delete('/todo/:todoId', deleteTodo);
// app.delete('/user/image', uploadProfilePhoto);

// console.log('this', loginUser);

// export the api
exports.api = functions.https.onRequest(app);

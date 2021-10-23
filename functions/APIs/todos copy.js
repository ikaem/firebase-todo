// // api/functions/APIs/todos.js

// // const {
// //   getDocs,
// //   collection,
// //   addDoc,
// //   getDoc,
// //   doc,
// //   deleteDoc,
// //   updateDoc,
// // } = require('@firebase/firestore');

// const {} = require('firebase-admin/firestore');

// const { db } = require('../util/admin');

// exports.getAllTodos = async (request, response) => {
//   try {
//     const data = await db
//       .collection('todos')
//       .orderBy('createdAt', 'desc')
//       .get();

//     let todos = [];
//     // const data = await getDocs(collection(db, 'todos'));

//     data.forEach((doc) => {
//       todos.push({
//         todoId: doc.id,
//         title: doc.data().title,
//         body: doc.data().body,
//         createdAt: doc.data().createdAt,
//       });
//     });

//     console.log({ todos });

//     return response.json(todos);
//   } catch (err) {
//     console.error(err);
//     return response.status(500).json({ error: err.code });
//   }
// };

// exports.postOneTodo = async (request, response) => {
//   if (request.body.body.trim() === '')
//     return response.status(400).json({ body: 'Must not be empty' });

//   if (request.body.title.trim() === '')
//     return response.status(400).json({ title: 'Must not be empty' });

//   const newTodoItem = {
//     title: request.body.title,
//     body: request.body.body,
//     createdAt: new Date().toISOString(),
//   };

//   try {
//     const doc = await db.collection('todos').add(newTodoItem);

//     // const doc = await addDoc(collection(db, 'users'), newTodoItem);

//     const responseTodoItem = {
//       ...newTodoItem,
//       id: doc.id,
//     };

//     // TODO why does he  return?
//     return response.json(responseTodoItem);
//   } catch (err) {
//     console.error(err);
//     response.status(500).json({ error: 'Something went wrong' });
//   }
// };

// exports.deleteTodo = async (request, response) => {
//   const document = db.doc(`/todos/${request.params.todoId}`);

//   // const document = doc(db, 'todos', request.params.todoId);

//   try {
//     const doc = await document.get();

//     // const docRef = await getDoc(document);

//     if (!doc.exists)
//       return response.status(404).json({ error: 'Todo not found' });

//     // await deleteDoc(document);
//     await document.delete();

//     response.json({ message: 'Delete successfull' });
//   } catch (err) {
//     console.error(err);
//     response.status(500).json({ error: err.code });
//   }
// };

// exports.editTodo = async (request, response) => {
//   if (!request.body.todoId || !request.body.createdAt)
//     return response.status(403).json({ message: 'Not allowed to edit' });

//   const document = db.collection('todos').doc(`${request.params.todoId}`);

//   // const document = doc(db, 'todos', request.params.todoId);

//   try {
//     await document.update(request.body);
//     // await updateDoc(document, request.body);

//     response.json({ message: 'Updated successfully' });
//   } catch (err) {
//     console.error(err);
//     response.status(500).json({
//       error: err.code,
//     });
//   }
// };

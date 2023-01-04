const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = 5800;

// cors() - will allow to run on different domain suppose node is running on 5000 and react is running on 3000
// middlewares
app.use(cors());
app.use(express.json()); // allow to get data from client in json format

//routes and controller
app.post('/todos', async (req, res) => {
     try {
          const { description } = req.body;
          // you don't have to add $sign 1, that just pg library to add dynamic data
          //$! is simply a placeholder and the values is specified in 2nd argument in array as description
          const newTodo = await pool.query(
               'INSERT INTO todo (description) VALUES($1) RETURNING *',
               [description]
          );

          res.json(newTodo.rows[0]);
     } catch (err) {
          console.error(err.message);
     }
});

app.get('/todos', async (req, res) => {
     try {
          //ASC ,DESC - to sort into order list
          const todoLists = await pool.query(
               ' SELECT * FROM todo ORDER BY todo_id DESC'
          );
          res.json(todoLists.rows);
     } catch (err) {
          console.log(err.message);
     }
});

app.get('/todos/:id', async (req, res) => {
     try {
          const { id } = req.params;
          const todoList = await pool.query(
               ' SELECT * FROM todo WHERE todo_id = $1',
               [id]
          );
          res.json(todoList.rows);
     } catch (err) {
          console.log(err.message);
     }
});

app.put('/todos/:id', async (req, res) => {
     const { id } = req.params;
     const { description } = req.body;
     const updateTodo = await pool.query(
          'UPDATE todo SET description= $1 WHERE todo_id = $2',
          [description, id]
     );
     res.json('Todo was updated!');
});

app.delete('/todos/:id', async (req, res) => {
     try {
          const { id } = req.params;
          const deleteTodo = await pool.query(
               'DELETE FROM todo WHERE todo_id = $1',
               [id]
          );
          res.json('Todo was deleted!');
     } catch (err) {
          console.log(err.message);
     }
});

app.listen(PORT, () => {
     console.log(`Server is listening at ${PORT}`);
});

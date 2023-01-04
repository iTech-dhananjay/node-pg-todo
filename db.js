const Pool = require('pg').Pool;

const pool = new Pool({
     user: 'dhananjaykumar',
     password: 'password',
     host: 'localhost',
     port: 5432,
     database: 'todopg',
});

module.exports = pool;

// app.get('/', (req, res) => {
//      res.send('Todo App with Node and Postgres');
// });

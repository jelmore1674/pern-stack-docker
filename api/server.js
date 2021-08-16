const express = require('express');
const cors = require('cors');
const knex = require('knex');
const app = express();

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI,
});

app.use(express.json());
app.use(cors());

app.get('/api', async(req, res) => {
    const users = await db.select('*').from('users');
    res.status(209).json({...users[0] });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
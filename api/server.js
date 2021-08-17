const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const homeRouter = require('./routes/home');

const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next).catch(next));
};

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api', homeRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
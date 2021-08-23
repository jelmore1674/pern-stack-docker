const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const path = require('path');
const homeRouter = require('./routes/home');
const uploadRouter = require('./routes/upload');
const profileRoute = require('./routes/profile');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/uploads/images',
    express.static(path.join(__dirname, 'uploads/images'))
);

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/', homeRouter);

app.use('/profile', profileRoute);

app.use('/upload', uploadRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/api');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/api', apiRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Library API with Subscription System Running!' });
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Library API listening at http://localhost:${PORT}`);
});

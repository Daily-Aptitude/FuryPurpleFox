const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const quizRoutes = require('./routes/quizes');
const questionRoutes = require('./routes/questions');


app.use(quizRoutes);
app.use(questionRoutes);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error(err));

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

// routes links
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');


// view engine settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// bodyParser settings
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

// mongoDB settings
mongoose.connect(process.env.MONGO_URI, {
                                            useNewUrlParser: true,
                                            useUnifiedTopology: true
                                        }
);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to MongoDB...'))


// routes
app.use('/', indexRouter);
app.use('/authors', authorsRouter);




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('Server is running on port ', PORT));
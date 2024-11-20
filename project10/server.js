const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const blogRouter = require('./routes/blogRouter');
const commentRouter = require('./routes/commentRouter');
const methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

app.use(methodOverride('_method'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')))

app.use('/', userRouter);
app.use('/', blogRouter);
app.use('/', commentRouter);

app.get('/test', (req, res) => {
  res.render('test');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
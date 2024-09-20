import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/controllers.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', router)
app.use('/quiz', router)
app.use('/submit-quiz', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

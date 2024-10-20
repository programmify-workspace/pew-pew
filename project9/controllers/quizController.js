const Pool = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const quizController = {
    getSignin: async (req, res) => {
        try {
            res.render('signin');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    getSignup: async (req, res) => {
        try {
            res.render('signup');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    postSignin: async (req, res) => {
        const { email, password } = req.body;
        try {
          // Check if user exists
          const [ user ] = await Pool.query('SELECT * FROM users WHERE email = ?', [email]);
      
          if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
          }
      
          // Compare password
          const isMatch = await bcrypt.compare(password, user[0].password);
          if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
          }
      
          // Generate token
          const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
          console.log({ message: 'Login successful', token });

          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 10*60*60*24*30 // 1 month
          });

          res.redirect('/');
        } catch (err) {
          console.error(err.message);
          return res.status(500).json({ message: 'Server error' });
        }
      },
    postSignup: async (req, res) => {
        const { username, email, password } = req.body;
        try {
          // Check if user already exists
          const [existingUser] = await Pool.query('SELECT * FROM users WHERE email = ?', [email]);
          if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Insert user into the database
          const [newUser] = await Pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
      
          const token = jwt.sign({ id: newUser.insertId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
          console.log({ message: 'Signup successful', token });

          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 10*60*60*24*30 // 1 month
          });

          res.redirect('/');

        } catch (err) {
          console.error(err.message);
          return res.status(500).json({ message: 'Server error' });
      }
    },
    getQuizSubjects: async (req, res) => {
      try {
          const [subjects] = await Pool.query('SELECT DISTINCT topic FROM quiz');
          console.log(subjects);
          res.render('index', { subjects });
      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
    },   
    postQuizSubject: async (req, res) => {
        const { subject } = req.body;
    
        console.log(subject);
    
        res.redirect(`/quiz/${subject}`);
    },
    getQuiz: async (req, res) => {
        try {
            const { id } = req.params;

            console.log(id);
            const [ result ] = await Pool.query('SELECT * FROM quiz WHERE topic = ?', [id]);

            console.log(result);

            if (result === 0) {
                return res.status(404).json({ message: 'No quizzes found for this topic.' });
            }

            res.render('quiz', { quiz: result });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    postScore: async (req, res) => {
        try {
            const userChoices = JSON.parse(req.body['quiz-result']);
            const topic = req.body.topic;
            const token = req.cookies.token;
            const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            let correctCount = 0;
            const detailedResults = [];
    
            for (const userChoice of userChoices) {
                const { id, choice } = userChoice;
                const [result] = await Pool.query('SELECT * FROM quiz WHERE id = ?', [id]);
    
                if (result.length === 0) {
                    return res.status(404).json({ message: `Quiz with ID ${id} not found.` });
                }
    
                const correctAnswer = result[0].answer;
                const isCorrect = choice === correctAnswer;
                if (isCorrect) {
                    correctCount++;
                }
    
                detailedResults.push({
                    id: id,
                    question: result[0].question,
                    userChoice: choice,
                    correctAnswer: correctAnswer,
                    isCorrect: isCorrect
                });
            }
    
            const scorePercentage = (correctCount / userChoices.length) * 100;
    
            // Store the game result
            await Pool.query(
                'INSERT INTO game (user_id, topic, score) VALUES (?, ?, ?)',
                [userId, topic, scorePercentage]
            );
    
            return res.render('score', {
                viewType: 'quizResult',
                correctCount: correctCount,
                totalQuestions: userChoices.length,
                detailedResults: detailedResults,
                scorePercentage: scorePercentage
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    
    getScore: async (req, res) => {
        try {
            const token = req.cookies.token;
            const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    
            const [games] = await Pool.query('SELECT * FROM game WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    
            if (games.length === 0) {
                return res.status(404).json({ message: 'No game results found for this user.' });
            }
            
            res.render('score', { 
                viewType: 'gameHistory',
                games: games 
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
};

module.exports = quizController;
const pool = require('../config/database.js');

const listController = {
    allList: async (req, res) => {
        try {
            const [lists, fields] = await pool.query("SELECT * FROM list");
            console.log(lists);
        
            res.render('index', {lists});
        } catch (err) {
            console.error(err);
            res.status(500).send('Oops! Server Error');
        }
    },
    addToList: async (req, res) => {
        try {
            const { task } = req.body;            
            console.log(`Task: ${task}`);            
            
            if (!task) {
                console.error('Task is required');
                return res.status(400).send('Task is required');
            }

            const [result] = await pool.query("INSERT INTO list (task) VALUES (?)", [task]);

            console.log('Insert Result:', result);
            
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.status(500).send('Oops! Server Error');
        }
    },
    updateList: async (req, res) => {
        try {
            const { id, task} = req.body;
            
            const query = "UPDATE list SET task = ? WHERE id = ?";
            const [result] = await pool.query(query, [task, id]);
            
            console.log(result);

            if (result.affectedRows > 0) {
                res.redirect('/');
            } else {
                res.status(404).send('List not found');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Oops! Server Error');
        }
    },
    changeStatus: async (req, res) => {
        try {
            const { id, status } = req.body;
            const updatedStatus = status === 'true' ? 1 : 0;
            const query = "UPDATE list SET status = ? WHERE id = ?";
            const [result] = await pool.query(query, [updatedStatus, id]);

            console.log(status)
            console.log('Insert Result:', result);
            
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.status(500).send('Oops! Server Error');
        }

    },
    deleteList: async (req, res) => {
        try {
            const { id } = req.body;
            const query = "DELETE FROM list WHERE id = ?";
            const [result] = await pool.query(query, [id]);
            
            console.log(result);

            if (result.affectedRows > 0) {
                res.redirect('/');
            } else {
                res.status(404).send('Task not found');
            }                
        } catch (err) {
            console.log(err);
            res.status(500).send('Oops! Server Error');
        }
    }
}

module.exports = listController;
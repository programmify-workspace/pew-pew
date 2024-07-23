const pool = require('../config/database');


const userController = {
    addUsers: async (req, res) => {
        try {
            const { name, email, password } = req.body;            
            console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);            
            
            const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
            
            console.log(result);
            
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.status(500).send('Oops! Server Error');
        }
    },
    getUsers: async (req, res) => {
        try {
            const [users, fields] = await pool.query("SELECT * FROM users");
            console.log(users);
            console.log(fields);

            res.render('index', {users});

        } catch (err) {
            console.error(err);
            res.status(500).send('Oops! Server Error');
        }
    },
    editUser: async (req, res) => {
        try {
            const { id, name, email, password } = req.body;
            
            const query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
            const [result] = await pool.query(query, [name, email, password, id]);
            
            console.log(result);

            if (result.affectedRows > 0) {
                res.redirect('/');
            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Oops! Server Error');
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.body;
            const query = "DELETE FROM users WHERE id = ?";
            const [result] = await pool.query(query, [id]);
            
            console.log(result);

            if (result.affectedRows > 0) {
                // res.status(200).send('User deleted successfully');
                res.redirect('/');
            } else {
                res.status(404).send('User not found');
            }                
        } catch (err) {
            console.log(err);
            res.status(500).send('Oops! Server Error');
        }
    }
}

module.exports = userController;



// async function fetchUsers() {
//     try {
//         const [rows, fields] = await pool.query("SELECT * FROM users");
//         console.log(rows);
//         console.log(fields);
//     } catch (err) {
//         console.error(err);
//     }
// }



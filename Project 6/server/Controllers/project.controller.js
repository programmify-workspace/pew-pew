const db = require('../Config/db');

const getProjects = (req, res) => {
    const sql = "SELECT * FROM projects WHERE type = 'web-development'";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

module.exports = { getProjects };

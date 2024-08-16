const dbPool = require('../config/db');

// CREATE
exports.createRecord = async (req, res) => {
    try {
        const { name, description } = req.body;
        await dbPool.query('INSERT INTO records (name, description) VALUES (?, ?)', [name, description]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// READ
exports.listRecords = async (req, res) => {
    try {
        const { page = 1, sort = 'id', order = 'ASC', search = '' } = req.query;
        const limit = 10;
        const offset = (page - 1) * limit;

        const [records] = await dbPool.query(
            `SELECT * FROM records WHERE name LIKE ? ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
            [`%${search}%`, sort, limit, offset]
        );
        
        const [countResult] = await dbPool.query(
            `SELECT COUNT(*) as count FROM records WHERE name LIKE ?`,
            [`%${search}%`]
        );
        
        const totalRecords = countResult[0].count;
        const totalPages = Math.ceil(totalRecords / limit);

        res.render('index', {
            records,
            page,
            totalPages,
            sort,
            order,
            search
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// UPDATE
exports.updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        await dbPool.query('UPDATE records SET name = ?, description = ? WHERE id = ?', [name, description, id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// DELETE
exports.deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        await dbPool.query('DELETE FROM records WHERE id = ?', [id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

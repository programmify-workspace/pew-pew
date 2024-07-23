import { nanoid } from 'nanoid';
import db from '../config/database.js'

const urlController = {
    allUrls: async (req, res) => {
        try {
            const [urls, fields] = await db.query("SELECT * FROM urls");
            console.log(urls);

            res.render('index', {urls});
        } catch (err) {
            console.error(err);
            res.status(500).send('Uh Oh.. Server Error');
        }
    },
    postShortUrl: async (req, res) => {
        const fullUrl = req.body.fullUrl;
        const shortUrl = nanoid(6);

        try {
            const [results, fields] = await db.query('INSERT INTO urls (fullUrl, shortUrl) VALUES (?, ?)', [fullUrl, shortUrl]);
            console.log(results)
            res.redirect('/');

        } catch (err) {
            console.error("Error in postShortUrl: ", err);
            res.status(500).send('Server Error');
        }
    },
    getShortUrl: async (req, res) => {
        const shortUrl = req.params.shortUrl;

        try {
            const [results, fields] = await db.query('SELECT * FROM urls WHERE shortUrl = ?', [shortUrl]);
            if (results.length > 0) {
                db.query('UPDATE urls SET clicks = clicks + 1 WHERE shortUrl = ?', [shortUrl]);
                res.redirect(results[0].fullUrl);
            } else {
                res.status(404).send('URL not found');
            }
        } catch (err) {
            console.error("Error in getShortUrl: ", err);
            res.status(500).send('Server Error');
        }
    },
    deleteUrl: async (req, res) => {
        try {
            const { id } = req.body;
            const query = "DELETE FROM urls WHERE id = ?";
            const [result] = await db.query(query, [id]);
            
            console.log(result);

            if (result.affectedRows > 0) {
                res.redirect('/');
            } else {
                res.status(404).send('Url not found');
            }       
        } catch (err) {
            console.log("Failed to delete.. error: ", err);
        }
    }
}

export default urlController;



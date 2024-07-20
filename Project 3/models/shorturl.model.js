const express = require('express'),
    app = express()
const db = require('../db/database')

// POST
app.post("/api/create-short-url", (req, res) => {
    let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi, '').substr(2, 10);
    let sql = `INSERT INTO links(longurl,shorturlid) VALUES('${req.body.longurl}','${uniqueID}')`;
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                status: "notok",
                message: "Something went wrong"
            });
        } else {
            res.status(200).json({
                status: "ok",
                shorturlid: uniqueID
            });
        }
    })
});

// GET
app.get("/api/get-all-short-urls", (req, res) => {
    let sql = `SELECT * FROM links`;
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                status: "notok",
                message: "Something went wrong"
            });
        } else {
            res.status(200).json(result);
        }
    })
});

// GET
app.get("/:shorturlid", (req, res) => {
    let shorturlid = req.params.shorturlid;
    let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                status: "notok",
                message: "Something went wrong"
            });
        } else {
            sql = `UPDATE links SET count=${result[0].count + 1} WHERE id='${result[0].id}' LIMIT 1`;
            db.query(sql, function (error, result2) {
                if (error) {
                    res.status(500).json({
                        status: "notok",
                        message: "Something went wrong"
                    });
                } else {
                    res.redirect(result[0].longurl);
                }
            })
        }
    })
});

module.exports = app;
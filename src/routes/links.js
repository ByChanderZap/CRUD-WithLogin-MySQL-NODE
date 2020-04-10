const express = require('express');
const router = express.Router();

const pooldb = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add')
});


router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;

    const newLink={
        title,
        url,
        description
    };
    await pooldb.query('INSERT INTO links_table set ?', [newLink]);
    res.send('received');
});

module.exports = router;
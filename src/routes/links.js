const express = require('express');
const router = express.Router();

const pooldb = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add')
});


router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;

    const newLink = {
        title,
        url,
        description
    };
    await pooldb.query('INSERT INTO links_table set ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links')
});

router.get('/', async (req, res) => {
    const links = await pooldb.query('SELECT * FROM links_table');
    res.render('links/list.hbs', { links });
});


router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pooldb.query('DELETE FROM links_table WHERE id = ?', [id]);
    req.flash('success', 'Link removed successfully');
    res.redirect('/links');
});


router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const data = await pooldb.query('SELECT * FROM links_table WHERE id = ?', [id]);

    res.render('links/edit', { data: data[0] });
});



router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;

    const linkEdit = {
        title,
        description,
        url
    };

    await pooldb.query('UPDATE links_table set ? WHERE id = ?', [linkEdit, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');
});


module.exports = router;
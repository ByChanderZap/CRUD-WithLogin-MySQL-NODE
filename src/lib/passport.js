const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pooldb = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;

    const newUser = {
        fullname,
        password: passport,
        username: username
    };

    newUser.password = await helpers.encryptPassword(password)

    const result = await pooldb.query('INSERT INTO users SET ?', [newUser]);

    newUser.id = result.insertId;

    return done(null, newUser);

}));


passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pooldb.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});
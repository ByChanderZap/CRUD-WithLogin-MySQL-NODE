const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pooldb = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    //console.log(req.body);
   
    const rows = await pooldb.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0){
        const user = rows[0];
        console.log(user.password);
        const validated = await helpers.matchPassword(password, user.password);

        if(validated){
            done(null, user, req.flash('success', 'Welcome ' + user.username));
        }else{
            done(null, false, req.flash('message','Incorrect Password'));
        }
    }else{
        return done(null, null, req.flash('message', 'Username doesnt exists'));
    }
    
}));


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
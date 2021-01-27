const bcrypt = require('bcryptjs')
const saltRounds = 10;

module.exports = {
    register: async(req, res) => {
        const {username,password} = req.body
        const db = req.app.get('db');
        const profilePic = `https://robohash.org/${username}.png`

        const [user] = await db.check_user(username)
        if(user) {
            return res.status(409).send('username taken')
        }
        let salt = bcrypt.genSaltSync(saltRounds) 
        const hash = bcrypt.hashSync(password,salt)

        const [newUser] = await db.create_user(username,hash,profilePic)

        req.session.user = {
            username : newUser.username,
            id: newUser.id,
            profile_pic : newUser.profile_pic
        }
        res.status(200).send(req.session.user)
    },
    login: async(req, res) => {
        const {username,password} = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.check_user(username)
        if(!foundUser) {
            return res.status(401).send('User not found.Please register as a user')
        }
        const isAuthenticated = bcrypt.compareSync(password, foundUser.password)
        if(!isAuthenticated) {
            return res.status(403).send('Incorrect Password')
        }
        req.session.user = {
            username : foundUser.username,
            id: foundUser.id,
            profile_pic: foundUser.profile_pic
        }
        return res.status(200).send(req.session.user) 
        
    },
    getUser: async(req, res) => {
        const {user} = req.session
        if(user) return res.status(200).send(req.session.user)
        else return res.sendStatus(401)
    },
    logout: async(req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}
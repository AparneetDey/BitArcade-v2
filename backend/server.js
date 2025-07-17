const express = require("express");
const cors = require("cors")
const app = express();
const session = require("express-session")
const port = 3000;

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://bit-arcade-v2.vercel.app'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "Happygamer008!",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))


const users = [{ username: 'Aparneet', email: 'abc@gmail.com', password: '12345' }];

app.get('/user', (req, res) => {
    console.log(req.session.user)
    if(req.session.user){
        res.json({ 'data': req.session.user });
    } else {
        res.status(401).json({'message': 'Not Logged In'})
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (user && user.password === password) {
        req.session.user = user;
        res.json(user);
    } else {
        req.session.user = {};
        res.json(user);
    }
})

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
        req.session.user = { username, email, password };
        users.push(user);
        res.json(user);
    } else {
        req.session.user = {};
        res.json(user);
    }
})

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}/users`));


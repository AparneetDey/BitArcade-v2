const express = require("express");
const cors = require("cors")
const app = express();
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


const users = [{username: 'Aparneet', email: 'abc@gmail.com', password: '12345'}];

let currentUser = {};

app.get('/user', (req, res) => {
    res.json({ 'data': currentUser });
});

app.post('/login', (req,res) => {
    const {email, password} = req.body;

    const user = users.find(user => user.email === email);

    if (user && user.password === password) {
        currentUser = user;
        res.json(currentUser);
    } else {
        currentUser = {};
        res.json(currentUser)
    }
})

app.post('/signup', (req,res) => {
    const {username, email, password} = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
        currentUser = {username, email, password};
        users.push(user);
        res.json(currentUser);
    } else {
        currentUser = {};
        res.json(currentUser)
    }
})

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}/users`));


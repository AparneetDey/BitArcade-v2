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

// 🔽 Add this right after the CORS setup
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});


app.get('/user', (req, res) => {
    res.json({ 'data': { 'username': 'Aparneet', 'password': '12345', 'email': 'xyz@gmail.com' } });
});

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}/users`));


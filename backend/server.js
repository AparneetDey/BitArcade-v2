const express = require("express");
const cors = require("cors")
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // if using cookies or auth headers
}));

app.get('/user', (req, res) => {
    res.json({ 'data': {'username': 'Aparneet', 'password': '12345', 'email': 'xyz@gmail.com'} });
});

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}/users`));


const express = require("express");
const cors = require("cors")
const app = express();
const session = require("express-session")
const port = 3000;
require('dotenv').config();

let users = [{ username: 'Aparneet', email: 'abc@gmail.com', password: '12345' }];

const origin = process.env.NODE_ENV === 'production' ? 'https://bit-arcade-v2.vercel.app' : 'http://localhost:5173';

app.use(cors({
	origin: origin,
	credentials: true
}));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);
console.log(process.env.NODE_ENV)

app.use(session({
	name: 'BitArcade.sid',
	secret: process.env.NODE_SECRET_KEY,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === 'production', // true if using HTTPS
		httpOnly: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		maxAge: 1000 * 60 * 60 * 24 // 1 day
	}
}))

app.get('/', (req, res) => {
	res.json({ 'users': users });
})

app.get('/user', (req, res) => {
	console.log(req.session.user);
	if (req.session.user) {
		res.json({ isSignedIn: true, 'data': req.session.user });
	} else {
		res.json({ isSignedIn: false, 'data': req.session.user || 'Empty' });
	}
});

app.post('/login', (req, res) => {
	const { email, password } = req.body;

	const user = users.find(user => user.email === email);

	if (user && user.password === password) {
		req.session.user = user;
		res.json([req.session.user]);
	} else {
		req.session.user = {};
		res.json({ 'message': 'notRegistered' });
	}
})

app.post('/signup', (req, res) => {
	const { username, email, password } = req.body;

	const user = users.find(user => user.email === email);

	if (!user) {
		req.session.user = { username, email, password };
		users.push(req.session.user);
		res.json([req.session.user]);
	} else {
		req.session.user = {};
		res.json({ 'message': 'registered' });
	}
})

app.post('/logout', (req, res) => {
	const { action } = req.body;

	if (action === 'logout') {
		req.session.destroy((err) => {
			if (err) {
				console.log('Error signing out');
				res.status(500).send('Log out Fail');
			}
			res.clearCookie('BitArcade.sid');
			res.status(200).json({ message: 'Logged out' });
		})
	} else if (action === 'delete') {
		const currentUser = req.session.user;

		users = users.filter(user => user.email !== currentUser.email);

		req.session.destroy((err) => {
			if (err) {
				console.log('Error signing out');
				res.status(500).send('Log out Fail');
			}
			res.clearCookie('BitArcade.sid');
			res.status(200).json({ message: 'Account Deleted' });
		})
	}

})

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}/`));


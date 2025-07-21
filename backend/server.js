const express = require("express");
const cors = require("cors")
const app = express();
const session = require("express-session")
const port = 3000;

let users = [{ username: 'Aparneet', email: 'abc@gmail.com', password: '12345' }];

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
	name: 'BitArcade.sid',
	secret: "Happygamer008!",
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: true, // true if using HTTPS
		httpOnly: true,
		sameSite: 'none',
		maxAge: 1000 * 60 * 60 * 24 // 1 day
	}
}))

app.get('/', (req, res) => {
	res.json({ 'users': users });
})

app.get('/user', (req, res) => {
	if (req.session.user) {
		res.json({ isSignedIn: true, 'data': req.session.user, 'session': req.session.user });
	} else {
		res.json({ isSignedIn: false, 'session': req.session.user })
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
		res.json({'message': 'notRegistered'});
	}
})

app.post('/signup', (req, res) => {
	const { username, email, password } = req.body;
	console.log(email);

	const user = users.find(user => user.email === email);
	console.log(user);

	if (!user) {
		req.session.user = { username, email, password };
		users.push(req.session.user);
		console.log(users);
		res.json([req.session.user]);
	} else {
		req.session.user = {};
		res.json({'message': 'registered'});
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
		})
	} else if(action === 'delete') {
		const currentUser = req.session.user;

		users = users.filter(user => user.email !== currentUser.email);

		req.session.destroy((err) => {
			if (err) {
				console.log('Error signing out');
				res.status(500).send('Log out Fail');
			}
			res.clearCookie('BitArcade.sid');
		})
	}

})

app.post('/deleteacc', (req, res) => {

})

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}/`));


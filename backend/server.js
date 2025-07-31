const express = require("express");
const cors = require("cors")
const app = express();
const session = require("express-session")
const port = 3000;
require('dotenv').config();

let users = [{ username: 'Aparneet', email: 'abc@gmail.com', password: '12345' }];

const origin = process.env.NODE_ENV === 'production' ? 'https://bit-arcade.vercel.app/' : 'http://localhost:5173';

const GAMES_API_URL = 'https://api.rawg.io/api';

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
	res.json({ 'users': users, 'origin': origin });
})

app.get('/games', async (req,res) => {
	const {query} = req.query;

	const endpoint = query ? `${GAMES_API_URL}/games?key=${process.env.NODE_API_KEY}&page=1&ordering=-rating&search=${encodeURIComponent(query)}` : `${GAMES_API_URL}/games?key=${process.env.NODE_API_KEY}&page=1&page_size=30&ordering=-rating`

	try {
		const response = await fetch(endpoint);

		if(!response.ok){
			console.log('Response is not okay');
			res.status(500).json({'message': 'Response not okay'});
		}

		const data = await response.json();

		res.json(data);
	} catch (error) {
		console.log(`Error fetching games list: ${error}`);
		res.status(500).json({'message': 'Error fetching games'});
	}
})

app.get('/gameSlug', async (req,res) => {
	const {slug} = req.query;

	try {
		const response = await fetch(`${GAMES_API_URL}/games/${slug}?key=${process.env.NODE_API_KEY}`);

		if(!response.ok){
			console.log('Response is not okay');
			res.status(500).json({'message': 'Response not okay'});
		}

		const data = await response.json();

		res.json(data);
	} catch (error) {
		console.log(`Error fetching game: ${error}`);
		res.status(500).json({'message': 'Error fetching game'});
	}
})

app.get('/similargames', async (req,res) => {
	const {genre} = req.query;
	console.log(genre);

	try {
		const response = await fetch(`${GAMES_API_URL}/games?genres=${genre}&key=${process.env.NODE_API_KEY}&page=1&page_size=7&ordering=-rating`);

		if(!response.ok){
			console.log('Response is not okay');
			res.status(500).json({'message': 'Response not okay'});
		}

		const data = await response.json();

		res.json(data);
	} catch (error) {
		console.log(`Error fetching game: ${error}`);
		res.status(500).json({'message': 'Error fetching game'});
	}
})

app.get('/user', (req, res) => {
	if (req.session.user) {
		res.json({ isSignedIn: true, 'data': req.session.user });
	} else {
		res.json({ isSignedIn: false, 'data': req.session.user || 'Empty' });
	}
});

app.post('/login', (req, res) => {
	const { email, password } = req.body;

	const user = users.find(user => user.email === email);

	if (user) {
		if (user.password === password){
			req.session.user = user;
			res.json({'errorMessage': ''});
		} else {
			res.json({'errorMessage': 'Incorrect Password!'})
		}
	} else {
		res.json({ 'errorMessage': 'User not found!'});
	}
})

app.post('/signup', (req, res) => {
	const { username, email, password } = req.body;

	const user = users.find(user => user.email === email);

	if (!user) {
		req.session.user = { username, email, password };
		users.push(req.session.user);
		res.json({'errorMessage': ''});
	} else {
		res.json({ 'errorMessage': 'User is already registered!'});
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


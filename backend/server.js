const express = require("express");
const cors = require("cors")
const app = express();
const session = require("express-session")
const port = 3000;
require('dotenv').config();

const origin = process.env.NODE_ENV === 'production' ? 'https://bit-arcade.vercel.app' : 'http://localhost:5173';

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

app.get('/games', async (req,res) => {
	const {query} = req.query;

	const endpoint = query ? `${GAMES_API_URL}/games?key=${process.env.NODE_API_KEY}&page=1&ordering=-rating&search=${encodeURIComponent(query)}` : `${GAMES_API_URL}/games?key=${process.env.NODE_API_KEY}&page=1&ordering=-rating`

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

app.get('/genres', async (req,res) => {
	try {
		const response = await fetch(`${GAMES_API_URL}/genres?key=${process.env.NODE_API_KEY}`);

		if(!response.ok){
			console.log('Response is not okay');
			res.status(500).json({'message': 'Response not okay'});
		}
		
		const data = await response.json()

		if(!data){
			console.log('Error getting the data');
			res.status(500).json({'message': 'Data not okay'});
		}

		res.json(data);
	} catch(error){
		console.log(`Error fetching genres: ${error}`);
		res.status(500).json({'message': 'Error fetching genres'});
	}
})

app.get('/genregames', async (req,res) => {
	const {query} = req.query;

	const endpoint = query ? `${GAMES_API_URL}/games?key=${process.env.NODE_API_KEY}&page=1&ordering=-rating&genres=${encodeURIComponent(query)}` 
	: `${GAMES_API_URL}/games?key=${process.env.NODE_API_KEY}&page=30&ordering=-rating`

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

app.get('/session', (req,res) => {
	res.json({'session': req.session.user});
})

app.post('/user', (req, res) => {
	const {user} = req.body;

	if (user) {
		req.session.user = user
		res.json({ isSignedIn: true, 'user': req.session.user });
	} else {
		res.json({ isSignedIn: false, 'user': {} });
	}
});

app.post('/login', (req, res) => {
	const { login } = req.body;

	console.log(login)

	if(login) {
		res.json({'errorMessage': ''});
	} else {
		res.json({'errorMessage': 'Incorrect email or password'});
	}
})

app.post('/logout', (req, res) => {
	const {logout} = req.body;

	if(logout){
		req.session.destroy((err) => {
			if (err) {
				console.log('Error signing out');
				res.status(500).send('Log out Fail');
			}
			res.clearCookie('BitArcade.sid');
			res.status(200).json({ 'result': true });
		})
	} else {
		res.json({'result': false});
	}
})

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}/`));


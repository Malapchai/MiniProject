import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(async () => {
		console.log('Connected to MongoDB');
		const db = mongoose.connection.db;
		console.log('Connected to Database:', db.databaseName);

		// Checking the count of documents in tarot and chichiA
		const tarotCount = await db.collection('cards').countDocuments();
		console.log('Count of documents in cards:', tarotCount);

		const chichiACount = await db.collection('chichiA').countDocuments();
		console.log('Count of documents in chichiA:', chichiACount);

		const chichiBCount = await db.collection('chichiB').countDocuments();
		console.log('Count of documents in chichiB:', chichiBCount);

		const chichiCCount = await db.collection('chichiC').countDocuments();
		console.log('Count of documents in chichiC:', chichiCCount);
	})
	.catch((error) => console.error('MongoDB connection error:', error));

// === Mongoose Schemas & Models === //
// User Schema & Model
const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	birthDate: String
});
const User = mongoose.model('User', userSchema, 'User');

// Utility functions for JWT
function generateToken(user) {
	return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
		expiresIn: '1h'
	});
}

// Hash passwords with bcrypt
async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

async function comparePassword(plainPassword, hashedPassword) {
	return await bcrypt.compare(plainPassword, hashedPassword);
}

function authenticateToken(req, res, next) {
	const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
	if (!token) return res.sendStatus(401); // Unauthorized

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403); // Forbidden
		req.user = user; // Attach user info from token
		next();
	});
}

// Signup Route
// @ts-ignore
app.post('/api/signup', async (req, res) => {
	const { username, email, password, birthDate } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Email already in use' });
		}

		const hashedPassword = await hashPassword(password);
		const user = new User({ username, email, password: hashedPassword, birthDate });
		await user.save();
		console.log('New user created:', user);

		res.status(201).json({ message: 'User created successfully' });
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ message: 'Error creating user', error });
	}
});

// Login Route
// @ts-ignore
app.post('/api/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}

		// Generate a JWT
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ token, message: 'Login successful', username: user.username });
	} catch (error) {
		console.error('Error logging in user:', error);
		res.status(500).json({ message: 'Error logging in', error });
	}
});
// Protected Route Example
// @ts-ignore
app.get('/api/protected', (req, res) => {
	const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'No token provided' });

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(403).json({ message: 'Invalid token' });
		res.json({ message: 'Welcome to the protected route', user: decoded });
	});
});

// Tarot Cards Schema & Model
const cardSchema = new mongoose.Schema({
	name: String,
	upright_description: String,
	reverse_description: String,
	upright_keywords: String,
	reverse_keywords: String,
	image: String
});
const Card = mongoose.model('cards', cardSchema);

// Chi-Chi Sticks Schema & Model for Collection A
const chichiASchema = new mongoose.Schema({
	image: String
});
const ChichiA = mongoose.model('chichiA', chichiASchema);

// === Tarot Cards APIs === //

// API to get a single random tarot card
app.get('/api/random-tarot-card', async (req, res) => {
	try {
		const count = await Card.countDocuments();
		const randomIndex = Math.floor(Math.random() * count);
		const randomCard = await Card.findOne().skip(randomIndex);

		if (randomCard) {
			console.log('Fetched Tarot Card:', randomCard);
			res.json(randomCard);
		} else {
			res.status(404).json({ message: 'No Tarot card found' });
		}
	} catch (error) {
		console.error('Error fetching tarot card:', error);
		res.status(500).json({ message: 'Error fetching tarot card', error });
	}
});

// API to get three random tarot cards
app.get('/api/random-three-tarot-cards', async (req, res) => {
	try {
		const randomCards = await Card.aggregate([{ $sample: { size: 3 } }]);
		if (randomCards.length > 0) {
			console.log('Fetched 3 Tarot Cards:', randomCards);
			res.json(randomCards);
		} else {
			res.status(404).json({ message: 'No Tarot cards found' });
		}
	} catch (error) {
		console.error('Error fetching tarot cards:', error);
		res.status(500).json({ message: 'Error fetching tarot cards', error });
	}
});

// API to get five random tarot cards
app.get('/api/random-five-tarot-cards', async (req, res) => {
	try {
		const randomCards = await Card.aggregate([{ $sample: { size: 5 } }]);
		if (randomCards.length > 0) {
			console.log('Fetched 5 Tarot Cards:', randomCards);
			res.json(randomCards);
		} else {
			res.status(404).json({ message: 'No Tarot cards found' });
		}
	} catch (error) {
		console.error('Error fetching tarot cards:', error);
		res.status(500).json({ message: 'Error fetching tarot cards', error });
	}
});

// === Chi-Chi Sticks APIs === //

// Chi-Chi Endpoint for Collection A
// @ts-ignore
app.get('/api/random-chichi-a', async (req, res) => {
	try {
		const db = mongoose.connection.db; // Explicitly get the current database
		console.log('API Database:', db.databaseName); // Should be 'tarotDB'

		const collection = db.collection('chichiA');
		console.log('API Collection Name:', collection.collectionName); // Should be 'chichiA'

		const count = await collection.countDocuments();
		console.log('API Count of documents in chichiA:', count);

		if (count === 0) {
			return res.status(404).json({ message: 'No documents available in chichiA' });
		}

		const randomIndex = Math.floor(Math.random() * count);
		// Use find() instead of findOne() with limit(1) to get a single random document
		const randomChiChi = await collection.find().skip(randomIndex).limit(1).toArray();

		console.log('Random Chi-Chi:', randomChiChi[0]);

		if (randomChiChi.length === 0) {
			return res.status(404).json({ message: 'No Chi-Chi stick found in collection A' });
		}

		res.json(randomChiChi[0]); // Return the first element from the array
	} catch (error) {
		console.error('Error fetching Chi-Chi stick:', error);
		res.status(500).json({ message: 'Error fetching Chi-Chi stick', error });
	}
});

// @ts-ignore
app.get('/api/random-chichi-b', async (req, res) => {
	try {
		const db = mongoose.connection.db; // Explicitly get the current database
		console.log('API Database:', db.databaseName); // Should be 'tarotDB'

		const collection = db.collection('chichiB');
		console.log('API Collection Name:', collection.collectionName); // Should be 'chichiA'

		const count = await collection.countDocuments();
		console.log('API Count of documents in chichiB:', count);

		if (count === 0) {
			return res.status(404).json({ message: 'No documents available in chichiB' });
		}

		const randomIndex = Math.floor(Math.random() * count);
		// Use find() instead of findOne() with limit(1) to get a single random document
		const randomChiChi = await collection.find().skip(randomIndex).limit(1).toArray();

		console.log('Random Chi-Chi:', randomChiChi[0]);

		if (randomChiChi.length === 0) {
			return res.status(404).json({ message: 'No Chi-Chi stick found in collection B' });
		}

		res.json(randomChiChi[0]); // Return the first element from the array
	} catch (error) {
		console.error('Error fetching Chi-Chi stick:', error);
		res.status(500).json({ message: 'Error fetching Chi-Chi stick', error });
	}
});

// @ts-ignore
app.get('/api/random-chichi-c', async (req, res) => {
	try {
		const db = mongoose.connection.db; // Explicitly get the current database
		console.log('API Database:', db.databaseName); // Should be 'tarotDB'

		const collection = db.collection('chichiC');
		console.log('API Collection Name:', collection.collectionName); // Should be 'chichiA'

		const count = await collection.countDocuments();
		console.log('API Count of documents in chichiC:', count);

		if (count === 0) {
			return res.status(404).json({ message: 'No documents available in chichiC' });
		}

		const randomIndex = Math.floor(Math.random() * count);
		// Use find() instead of findOne() with limit(1) to get a single random document
		const randomChiChi = await collection.find().skip(randomIndex).limit(1).toArray();

		console.log('Random Chi-Chi:', randomChiChi[0]);

		if (randomChiChi.length === 0) {
			return res.status(404).json({ message: 'No Chi-Chi stick found in collection C' });
		}

		res.json(randomChiChi[0]); // Return the first element from the array
	} catch (error) {
		console.error('Error fetching Chi-Chi stick:', error);
		res.status(500).json({ message: 'Error fetching Chi-Chi stick', error });
	}
});

app.get('/api/protected', authenticateToken, (req, res) => {
	res.json({ message: 'This is a protected route.' });
});

// === Server Initialization === //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { createCheckoutSession } from './src/routes/api/create-checkout-session.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.SECRET_STRIPE_KEY, {apiVersion: "2024-09-30.acacia"});

// Load environment variables
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://fa6a-2403-6200-88a0-db33-45ae-9478-ded2-84d9.ngrok-free.app'],
    credentials: true
}));

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
    email: { type: String, unique: true, required: true },
    password: String,
    birthDate: String,
    googleId: String,
    picture: String,
    package: { type: String, default: "HOROSCAPE FREE" }
});
const User = mongoose.model('User', userSchema, 'User');

// Google OAuth2 Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Utility Functions
function generateToken(user) {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function verifyToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    return ticket.getPayload();
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// Middleware for JWT Authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Token received in authenticateToken:', token);

    if (!token) return res.status(401).json({ message: 'No token provided' });

    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Token verification failed', error: err.message });
        }
        req.user = user;
        next();
    });
}

// === API Endpoints === //

// Google Login
app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    try {
        const payload = await verifyToken(token);
        let user = await User.findOne({ googleId: payload.sub });

        if (!user) {
            user = await User.create({
                googleId: payload.sub,
                email: payload.email,
                username: payload.name,
                picture: payload.picture
            });
        }

        const appToken = generateToken(user);
        res.json({ token: appToken, user });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).json({ message: 'Invalid Google token' });
    }
});

// Signup
//@ts-ignore
app.post('/api/signup', async (req, res) => {
    const { username, email, password, birthDate } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

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

// Login
//@ts-ignore
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, message: 'Login successful', username: user.username });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Profile
//@ts-ignore
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: 'User not authenticated' });

        const user = await User.findById(userId).select('username email birthDate googleId');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            username: user.username,
            email: user.email,
            birthdate: user.birthDate,
            package: user.package || "HOROSCAPE FREE",
            isGoogleAccount: !!user.googleId
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile information' });
    }
});

// Protected Route Example
app.get('/api/protected', authenticateToken, (req, res) => {
    // @ts-ignore
    res.json({ message: 'This is a protected route.', user: req.user });
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
// @ts-ignore
const ChichiA = mongoose.model('chichiA', chichiASchema);

// === Payment Section === //
app.post('/api/create-checkout-session', createCheckoutSession);

// === Tarot Cards APIs === //

// API to get a single random tarot card
// @ts-ignore
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
// @ts-ignore
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
// @ts-ignore
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

// @ts-ignore
app.get('/api/protected', authenticateToken, (req, res) => {
	res.json({ message: 'This is a protected route.' });
});

// === Server Initialization === //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
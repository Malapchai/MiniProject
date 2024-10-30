import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

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

// === Server Initialization === //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
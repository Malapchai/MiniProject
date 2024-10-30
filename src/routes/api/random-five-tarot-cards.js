import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = 'tarotDB';

let client;
let db;

// Initialize MongoDB connection
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(MONGODB_URI); // No need for useNewUrlParser or useUnifiedTopology
        await client.connect();
        db = client.db(DATABASE_NAME);
    }
    return db;
}

// API endpoint to return three random tarot cards
export async function get() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('cards'); // Ensure the collection name is correct

        // Use MongoDB's aggregation to fetch three random cards
        const cards = await collection.aggregate([{ $sample: { size: 5 } }]).toArray();

        if (cards.length === 0) {
            return { status: 404, body: { error: 'No cards found' } };
        }

        return {
            status: 200,
            body: cards, // Return the array of three random cards
        };
    } catch (error) {
        console.error('Error fetching three random tarot cards:', error);
        return { status: 500, body: { error: 'Failed to fetch cards' } };
    }
}
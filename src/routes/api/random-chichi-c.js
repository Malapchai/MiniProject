import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = 'tarotDB';

let client;
let db;

// Initialize MongoDB connection
async function connectToDatabase() {
	if (!client) {
		client = new MongoClient(MONGODB_URI);
		await client.connect();
		db = client.db(DATABASE_NAME);
	}
	console.log('Connected to Database:', db.databaseName);
	return db;
}

// Fetch a random Chi-Chi stick from 'chichiC' collection
export async function get() {
	try {
		const db = await connectToDatabase();
		const chichiACollection = db.collection('chichiC');
		console.log('Using Collection:', chichiACollection.collectionName);

		const chichiACount = await chichiACollection.countDocuments();
		console.log('Actual Count of documents in chichiC:', chichiACount);

		const firstDocument = await chichiACollection.findOne();
		console.log('First document in chichiC:', firstDocument);

		// Use MongoDB's aggregation to fetch a random Chi-Chi stick
		const chichiC = await chichiACollection.findOne();

		if (chichiC.length === 0) {
			return { status: 404, body: { error: 'No Chi-Chi sticks found' } };
		}

		// Return the random Chi-Chi stick data
		return {
			status: 200,
			body: chichiC[0]
		};
	} catch (error) {
		console.error('Error fetching random Chi-Chi stick:', error);
		return { status: 500, body: { error: 'Failed to fetch Chi-Chi stick' } };
	}
}

// api/new-meetup
import { MongoClient } from 'mongodb';
import { DB_USER, DB_PASSWORD } from './config';

async function handler (req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@db-mongodb-nyc1-38303-b0451fe1.mongo.ondigitalocean.com/meetups?authSource=admin&replicaSet=db-mongodb-nyc1-38303&tls=true`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: 'Meetup inserted' });
  }
}

export default handler;

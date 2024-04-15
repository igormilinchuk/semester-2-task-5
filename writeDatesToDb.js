import fs from 'fs';
import mongodb from 'mongodb';

const { MongoClient } = mongodb;

const uri = "mongodb+srv://ihorvmilinchuk:1gkGaguvhiWodg7g@cluster0.wpbgecb.mongodb.net/";
const dbName = "cluster0";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

async function insertDataFromFile(filePath, collectionName) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        await collection.deleteMany({}); 
        const result = await collection.insertMany(jsonData); 
        console.log(`Replaced ${result.insertedCount} documents in ${collectionName} collection.`);
    } catch (error) {
        console.error(`Error inserting data into ${collectionName} collection:`, error);
    }
}

async function main() {
    await connectToDatabase();

    await insertDataFromFile('./data/days.json', 'days');
    await insertDataFromFile('./data/subjects.json', 'subjects');
    await insertDataFromFile('./data/times.json', 'times');

    await client.close();
}

main();

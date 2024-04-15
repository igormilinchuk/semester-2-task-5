import mongodb from 'mongodb';

const { MongoClient} = mongodb;

const uri = "mongodb+srv://ihorvmilinchuk:1gkGaguvhiWodg7g@cluster0.wpbgecb.mongodb.net/";
const dbName = "cluster0";

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to the database");

    const database = client.db(dbName);
    const days = await database.collection('days').find({}).toArray();
    const subjects = await database.collection('subjects').find({}).toArray();
    const times = await database.collection('times').find({}).toArray();

    const schedule = {};

days.forEach(day => {
    if (day.dayOfWeek !== 'Субота' && day.dayOfWeek !== 'Неділя') {
      schedule[day.dayOfWeek] = [];
  
      times.forEach(time => {
        const randomSubjectIndex = Math.floor(Math.random() * subjects.length);
        const subject = subjects[randomSubjectIndex];
  
        schedule[day.dayOfWeek].push({
          startTime: time.startTime,
          endTime: time.endTime,
          subjectName: subject.subjectName
        });
      });
    }
  });
  

    console.log('Generated Schedule:');
    console.log(schedule);

  } catch (error) {
    console.error("Error connecting to the database: ", error);
  } finally {
    await client.close();
  }
}

main();

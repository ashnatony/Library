require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    const db = client.db('library');
    
    // Update User collection schema
    console.log('Updating User collection schema...');
    
    // Add unique index on regNumber for regular users
    await db.collection('User').createIndex(
      { regNumber: 1 },
      { unique: true, sparse: true }
    );

    // Update admin users to remove regNumber
    const result = await db.collection('User').updateMany(
      { role: 'ADMIN' },
      { 
        $unset: { regNumber: "" },
        $set: { 
          "adminAccess.isActive": true,
          "adminAccess.grantedBy": "SYSTEM",
          "adminAccess.grantedAt": new Date()
        }
      }
    );

    console.log(`Updated ${result.modifiedCount} admin users`);

    // Ensure regular users have regNumber
    const usersWithoutRegNumber = await db.collection('User').find({
      role: 'USER',
      regNumber: { $exists: false }
    }).toArray();

    if (usersWithoutRegNumber.length > 0) {
      console.log(`Warning: Found ${usersWithoutRegNumber.length} regular users without registration numbers`);
      console.log('These users may need to be updated manually:');
      console.log(usersWithoutRegNumber.map(u => u.email));
    }

    console.log('Schema update completed successfully');
  } catch (error) {
    console.error('Error updating schema:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

main(); 
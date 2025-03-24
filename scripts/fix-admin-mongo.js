const { MongoClient } = require('mongodb');
require('dotenv').config();

async function fixAdminUsers() {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('library');
    const users = db.collection('User');

    // Find all admin users
    const adminUsers = await users.find({ role: 'ADMIN' }).toArray();
    console.log(`Found ${adminUsers.length} admin users`);

    // Update each admin user
    for (const admin of adminUsers) {
      console.log(`Updating admin user: ${admin.email}`);
      
      // Update the user to remove regNumber
      await users.updateOne(
        { _id: admin._id },
        { 
          $unset: { regNumber: "" },
          $set: { 
            "adminAccess.isActive": true,
            "adminAccess.grantedBy": "system"
          }
        }
      );
    }

    // Verify the changes
    const updatedAdmins = await users.find({ role: 'ADMIN' }).toArray();
    console.log('\nUpdated admin users:');
    updatedAdmins.forEach(admin => {
      console.log({
        email: admin.email,
        role: admin.role,
        regNumber: admin.regNumber,
        adminAccess: admin.adminAccess
      });
    });

  } catch (error) {
    console.error('Error fixing admin users:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

fixAdminUsers(); 
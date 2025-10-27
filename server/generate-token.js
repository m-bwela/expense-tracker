const jwt = require('jsonwebtoken');
require('dotenv').config();

// INSTRUCTIONS:
// 1. First, create a test user in your database:
//    INSERT INTO users (username, email, password) 
//    VALUES ('testuser', 'test@example.com', 'anypassword') 
//    RETURNING id;
//
// 2. Replace the userId below with the ID returned from step 1
// 3. Run this script: node generate-token.js
// 4. Copy the token and use it in Postman

const userId = 1; // CHANGE THIS to your actual user ID from the database

// Check if JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  console.error('\n❌ ERROR: JWT_SECRET not found in .env file');
  console.error('Add this to your .env file:');
  console.error('JWT_SECRET=your_secret_key_here\n');
  process.exit(1);
}

const payload = {
  user: {
    id: userId
  }
};

const token = jwt.sign(
  payload,
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

console.log('\n' + '='.repeat(70));
console.log('✅ JWT TOKEN GENERATED SUCCESSFULLY');
console.log('='.repeat(70));
console.log('\nUser ID:', userId);
console.log('Expires in: 7 days');
console.log('\n' + '-'.repeat(70));
console.log('YOUR TOKEN:');
console.log('-'.repeat(70));
console.log(token);
console.log('-'.repeat(70));
console.log('\n📋 COPY THE TOKEN ABOVE AND USE IT IN POSTMAN');
console.log('\nIn Postman, add a header:');
console.log('  Key:   Authorization');
console.log('  Value: Bearer ' + token.substring(0, 20) + '...');
console.log('\n' + '='.repeat(70) + '\n');

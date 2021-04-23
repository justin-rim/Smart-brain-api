const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {res.send('It is working')})
app.post('/signin',  signin.handleSignIn( db, bcrypt))
app.post('/register', register.handleRegister( db, bcrypt))
app.get('/profile/:id', profile.handleProfile( db))
app.put('/image', image.handleImage( db))
app.post('/imageurl', image.handleApiCall( db))
   
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})
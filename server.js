const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

const db = require('./config/dbConfig');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
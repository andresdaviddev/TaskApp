import app from './app.js';
import connect from './db.js'



app.listen(3000)
connect();
console.log('server on port',3000);
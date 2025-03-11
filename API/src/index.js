import app from './app.js';
import { connectDB } from './db.js';

const port = 3000

connectDB();
app.listen(port)
console.log('Backend server is running');
console.log('>>> Server port', port);
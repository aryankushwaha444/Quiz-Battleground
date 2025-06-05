import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import connectDB from './db/mongoDB.connection.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

connectDB();


app.use('/api', userRoutes);
app.use('/api/admin',adminRoutes);

app.get('/',(req,res)=>{
  res.send('Hello World');
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import produitRoutes from './routes/produits.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/assets', express.static('assets'));

app.use('/api/produits', produitRoutes);

app.get('/', (req, res) => {
  res.send('API DZShop en ligne 🚀');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/dzshop',
      {
        serverSelectionTimeoutMS: 10000
      }
    );

    console.log('✅ MongoDB connecté');

    app.listen(PORT, () => {
      console.log('🚀 Serveur sur http://localhost:' + PORT);
    });
  } catch (err) {
    console.error('❌ Erreur MongoDB :', err.message);
    process.exitCode = 1;
  }
}

startServer();
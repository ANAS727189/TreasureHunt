import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri: string = process.env.MONGODB_URI;

// basically connection reuse badha deega so it will handle concurrent users achhe se.
const options: MongoClientOptions = {
  maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || '200'),
  minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || '10'),
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  timeoutMS: 10000,
  retryWrites: true,
  retryReads: true,
  compressors: ['zlib'],
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line prefer-const
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
import { MongoClient, ServerApiVersion } from "mongodb";

const mongoUrl = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB_NAME;

if (!mongoUrl) {
  throw new Error("Missing MONGODB_URL environment variable.");
}

if (!dbName) {
  throw new Error("Missing MONGODB_DB_NAME environment variable.");
}

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const mongoClientPromise =
  globalForMongo._mongoClientPromise ??
  new MongoClient(mongoUrl, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClientPromise = mongoClientPromise;
}

export async function getMongoDb() {
  const client = await mongoClientPromise;
  return client.db(dbName);
}

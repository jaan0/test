import { MongoClient } from "mongodb";

// Reuse connection across hot reloads in dev and across Lambda invocations
let cached = global._mongoClient;

if (!cached) {
  cached = global._mongoClient = { client: null, promise: null };
}

export async function getMongoClient() {
  if (cached.client) return cached.client;

  if (!cached.promise) {
    const uri = process.env.MONGO_URL || process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME || "jsmq_webflow";

    if (!uri) {
      throw new Error("Missing MONGO_URL or MONGODB_URI env variable");
    }

    cached.promise = MongoClient.connect(uri).then((client) => {
      client.db(dbName); // ensure db exists
      return client;
    });
  }

  cached.client = await cached.promise;
  return cached.client;
}

export async function getDb() {
  const client = await getMongoClient();
  const dbName = process.env.DB_NAME || "jsmq_webflow";
  return client.db(dbName);
}


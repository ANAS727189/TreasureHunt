import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { betterAuth } from "better-auth";
import clientPromise from "./mongodb";

const dbPromise = clientPromise.then(client => client.db("treasure_hunt"));

export const auth = betterAuth({
  database: mongodbAdapter(await dbPromise),
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    }
});

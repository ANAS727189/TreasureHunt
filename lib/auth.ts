import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { betterAuth } from "better-auth";
import clientPromise from "./mongodb";
import type { Db } from "mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(clientPromise.then(client => client.db("treasure_hunt")) as unknown as Db),
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    }
});

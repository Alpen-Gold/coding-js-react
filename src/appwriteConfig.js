import { Account, Client, Databases } from "appwrite";

export const PROJECT_ID = "66a32938002953c5c2d6";
export const DATABASE_ID = "66a329f3003a7c67a162";
export const COLLECTION_ID_MESSAGES = "66a32a11003c9ea03c1c";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66a32938002953c5c2d6");
export const databases = new Databases(client);
export const account = new Account(client);

export default client;

const { Client, Databases, Storage } = require('node-appwrite')

const client = new Client()

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_SERVER_KEY)

 const databases = new Databases(client)
 const storage = new Storage(client)
 const appwrite = client


 module.exports = { client, databases, storage,appwrite }
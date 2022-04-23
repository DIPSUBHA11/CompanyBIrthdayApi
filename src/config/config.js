import dotenv from "dotenv";

dotenv.config();
const userName = process.env.DB_USER_NAME;
const password = process.env.DB_PWD;
const schema = process.env.DB_SCHEMA;
const development = {
    "url": `mongodb+srv://${userName}:${password}@cluster0.758dh.mongodb.net/${schema}?retryWrites=true&w=majority`
  }
  
  const production = {
    "url": "place production url here"
  }
  
export default process.env.NODE_ENV===true ? production : development;


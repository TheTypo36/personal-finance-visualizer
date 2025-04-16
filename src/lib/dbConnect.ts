import mongoose from "mongoose";

const dbUrl = process.env.dbUrl || "";

if (!dbUrl) throw new Error("please add mongodb db url");

type ConnectionObjection = {
  isConnected?: number;
};

const connection: ConnectionObjection = {};
const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("already connected to database");
    return;
  }
  try {
    const connectionInstance = await mongoose.connect(dbUrl);
    connection.isConnected = connectionInstance.connection.readyState;
    console.log("\n mongodbConnected at", connectionInstance.connection.host);

    return;
  } catch (error) {
    console.error("erro in connecting to database", error);
  }
};

export default dbConnect;
export { isConnected };

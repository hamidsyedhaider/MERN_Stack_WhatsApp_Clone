// Importing mongoose
import mongoose from 'mongoose';

// Importing the databaseUserName and databaseUserPassword from the environmentVariables file.
import { databaseUserName, databaseUserPassword } from "../Constants/environmentVariables.js";

// Connection url
const url = `mongodb://${databaseUserName}:${databaseUserPassword}@ac-82xri7h-shard-00-00.zrtgihz.mongodb.net:27017,ac-82xri7h-shard-00-01.zrtgihz.mongodb.net:27017,ac-82xri7h-shard-00-02.zrtgihz.mongodb.net:27017/?ssl=true&replicaSet=atlas-j3wwia-shard-0&authSource=admin&retryWrites=true&w=majority&appName=PracticeCluster`;

// Creating the connection function
const Connection = async () => {
    try {
        // Database connection
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed:', error.message);
    }
}

// Exporting the connection function
export default Connection;

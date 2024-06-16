// Importing express
import express from "express";

// Importing the User collection.
import User from "../Models/User.js";

// Importing the Conversation collection.
import Conversation from "../Models/Conversation.js";

// Importing the Message collection.
import Message from "../Models/Message.js";

// Importing the uploadMiddleware.
//import uploadMiddleware from "../Utils/uploadMiddleware.js";

// Importing fs, path, and formidable for file uploading
import formidable from "formidable";
import fs from 'fs';
import path from "path";

// Calling the express Router function
const route = express.Router();

// Adding the endpoints for the Apis.
//The following is the route and controller method for adding the user into the database.
route.post("/addUser", async (request, response) => {
    //All the logic where the data will be saved in the database will be written in the controller function. That controller function can directly be here in the route endpoint, or can be present in the Controller folder. I prefer making the controller function directly here.
    //Now writing the cotroller logic.
    try {
        //Printing the data to the console
        //console.log(request.body);

        //Checking to see if the user already exists in the database. We will do that by checking the sub field of the user. The sub field for all users is probably unique, that's why we're checking with it.
        let user = await User.findOne({ sub: request.body.sub });

        //If the user already exists, then we will not save the user again.
        if (user) {
            response.status(200).json({ message: "User already exists." });
            return;
        } else {
            //Creating a new user
            user = new User(request.body);

            //Saving the user to the database
            await user.save();

            //Sending a good response.
            response.status(200).json({ message: "User saved successfully.", user});
        }
    } catch (error) {
        return response.status(500).json( error.message );
    }
});

//The following is the route and controller method for getting all the users from the database.
route.get("/getUsers", async (request, response) => {
    try {
        //Fetching all the users from the database
        let users = await User.find({});

        //Sending the response
        return response.status(200).json( users );
    } catch (error) {
        return response.status(500).json( error.message );
    }
});

//The following is the route and controller method for setting the conversation between the logged in user and the user whose chat is opened.
route.post("/setConversation", async (request, response) => {
    try {
        // Extract senderId and receiverId from the request body
        const { senderId, receiverId } = request.body;

        // Checking if the conversation already exists in the database
        let conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] }});

        // If the conversation already exists, send a response
        if (conversation) {
            return response.status(200).json({ message: "Conversation already exists." });
        }

        // Create a new conversation
        conversation = new Conversation({
            members: [senderId, receiverId],       
        });

        // Save the conversation to the database
        await conversation.save();

        // Sending a success response
        response.status(200).json({ message: "Conversation saved successfully.", conversation});
    } catch (error) {
        // Sending an error response
        return response.status(500).json({ error: error.message });
    }
});

//The following is the route and controller method for getting the conversation between the logged in user and the user whose chat is opened.
route.get("/getConversation", async (request, response) => {
    try {
        // Extract senderId and receiverId from the request query
        const { senderId, receiverId } = request.query;

        // Fetch the conversation from the database
        let conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] }});

        // Sending the conversation as a response
        response.status(200).json( conversation );
    } catch (error) {
        // Sending an error response
        return response.status(500).json({ error: error.message });
    }
});

//The following is the route and controller method for sending the new message.
route.post("/sendNewMessage", async (request, response) => {
    try {
        // Extracting the new message from the request body
        const newMessage = new Message(request.body);

        // Saving the message to the database
        await newMessage.save();

        // Now fetching the conversation that this message is a part of, and updating that conversation such the the new message is saved in the latestMessage field of that conversation. The findByIdAndUpdate functions saves the database automatically as well.
        const ongoingConversation = await Conversation.findByIdAndUpdate(request.body.conversationId, { latestMessage: request.body.message });

        // Sending a success response
        response.status(200).json({ message: "Message sent successfully.", newMessage });
    } catch (error) {
        // Sending an error response
        return response.status(500).json({ error: error.message });
    }
});

//The following is the route and controller method for getting messages from the database for a conversation.
route.get("/getMessages", async (request, response) => {
    try {
        // Extract the conversationId from the request query
        const { conversationId } = request.query;

        // Fetch all the messages for the conversation
        let messages = await Message.find({ conversationId: conversationId });

        // Sending the messages as a response
        response.status(200).json( messages );
    } catch (error) {
        // Sending an error response
        return response.status(500).json({ error: error.message });
    }
});

//The following is the route and controller method for uploading the file.
route.post('/uploadFile', (req, res) => {
    //Using formidable to parse the form data coming from the frontend.
    const form = formidable({
        multiples: false,                   // Single file upload
        keepExtensions: true,               // Keep file extensions
        maxFileSize: 10 * 1024 * 1024,      // 10MB
        allowEmptyFiles: true               // Allow empty files
    });

    // The path where the files will be uploaded.
    const uploadDir = './uploads';

    // Ensuring the upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir;

    // Now parsing the form data.
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).json({ error: 'Error parsing form data' });
        }

        // Check if files.file is an array and get the first element
        const file = Array.isArray(files.file) ? files.file[0] : files.file;

        // Check for existence and log the file properties
        if (!file) {
            console.error('File is not defined');
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const oldPath = file.filepath; // Correct property for file path
        const originalFilename = file.originalFilename; // Correct property for original filename

        if (!oldPath || !originalFilename) {
            console.error('Invalid file data:', { oldPath, originalFilename });
            return res.status(400).json({ error: 'Invalid file data' });
        }

        // Generate a unique filename using timestamp and random string
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const uniqueFilename = `${timestamp}_${randomString}_${originalFilename}`;

        const newPath = path.join(uploadDir, uniqueFilename);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error('Error moving file:', err);
                return res.status(500).json({ error: 'Error moving file' });
            }
            return res.status(200).json({ message: 'File uploaded successfully', filePath: newPath });
        });
    });
});

//Now making the route and controller for getting the file based on url.
route.get('/getFile', (request, response) => {
    //Extracting the file path from the query.
    const { filePath } = request.query;

    //Sending the file as a response
    response.status(200).download(filePath);
});

export default route;

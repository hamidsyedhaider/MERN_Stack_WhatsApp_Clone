/////////////////////////////////////////////////////////////////////////////Backend Server Logic/////////////////////////////////////////////////////////////////////////////
// Importing express to use it.
import express from 'express';

// Importing the connection function from the db.js file
import Connection from './Database/db.js';

// Importing the route file.
import route from './routes/route.js';

// Importing the cors middleware
import cors from 'cors';

// Importing the frontendUrl from the environmentVariables file.
import { frontendUrl } from './Constants/environmentVariables.js';

// Importing http module to create server
import http from 'http';

// Initializing express
const app = express();

// Use CORS middleware
app.use(cors({
    origin: frontendUrl,
    methods: ["POST", "GET"],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Use express.json() middleware to parse JSON requests
app.use(express.json({ extended: true }));

// Using express.urlencoded to parse the request body
app.use(express.urlencoded({ extended: true }));

// Calling the base route in the route file.
app.use('/', route);

// Calling the connection function to connect to the database
Connection();

// Creating HTTP server instance so that this same server can be used for both express backend and socket.io.
const server = http.createServer(app);

// Port number (you can optionally use process.env.PORT || 3001 to dynamically assign the port)
const port = 3001;

// Creating the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


/////////////////////////////////////////////////////////////////////////////SocketIo Server Logic/////////////////////////////////////////////////////////////////////////////
// Importing Socket.IO server
import { Server as SocketIOServer } from 'socket.io';

// Initialize Socket.IO server
const io = new SocketIOServer(server, {
    cors: {
        origin: frontendUrl,
        methods: ["POST", "GET"],
        credentials: true,
        optionsSuccessStatus: 200
    }
});

// The following array contains active users.
let users = [];

// The following addUser handler function will be invoked when the addUser hitpoint from the frontend is called.
const addUser = (userData, socketId) => {
    !users.some(user => user.sub == userData.sub) && users.push({ ...userData, socketId });
};

// The following handler function will get the activeUser based on the receiverId.
const getActiveUser = (receiverId) => {
    return users.find(user => user.sub === receiverId);
};

// The following handler function will remove a user based on their socketId.
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

// The following is the connection event listener. It listens for the connection event.
io.on("connection", (socket) => {
    console.log("A user has connected.");

    // The following is to handle the addUser hitpoint from the client.
    socket.on("addUser", userData => {
        addUser(userData, socket.id);

        // Now sending the active users to the client.
        io.emit("getUsers", users);
    });

    // Now we handle the sendMessage event that will handle messages sent from one user to the other.
    socket.on("sendMessage", data => {
        const user = getActiveUser(data.receiverId);

        // Sending the message to the receiver on the specific socket that he is active on.
        if (user) {
            io.to(user.socketId).emit("getMessage", data);
        } else {
            console.log(`User with receiverId ${data.receiverId} not found.`);
        }
    });

    // Listen for the disconnect event to remove the user from the users array.
    socket.on("disconnect", () => {
        console.log("A user has disconnected.");
        removeUser(socket.id);

        // Sending the updated active users to the client.
        io.emit("getUsers", users);
    });
});

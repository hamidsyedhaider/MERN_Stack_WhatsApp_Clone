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


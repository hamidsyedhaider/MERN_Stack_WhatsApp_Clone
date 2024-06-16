// Importing axios
import axios from "axios";

// Importing the backend url from the environmentVariables file.
import { backendUrl } from "../Constants/environmentVariables";

// Making a front-end api function for adding the user.
export const addUser = async (data) => {
    try {
        // Sending a post request to the server.
        await axios.post(`${backendUrl}/addUser`, data);
    } catch (error) {
        console.log("Error in addUser api: ", error.message);
    }
};

// Making a front-end api function for getting all the users.
export const getUsers = async () => {
    try {
        // Sending a get request to the server.
        let response = await axios.get(`${backendUrl}/getUsers`);

        return response.data;
    } catch (error) {
        console.log("Error in getUsers api: ", error.message);
    }
};

// Making a front-end api function for setting the conversation.
export const setConversation = async (data) => {
    try {
        // Sending a post request to the server.
        await axios.post(`${backendUrl}/setConversation`, data);
    } catch (error) {
        console.log("Error in setConversation api: ", error.message);
    }
};

//Making a front-end api function for getting the conversation.
export const getConversation = async (data) => {
    try {
        // Sending a get request to the server.
        let response = await axios.get(`${backendUrl}/getConversation?senderId=${data.senderId}&receiverId=${data.receiverId}`);

        //Returning the response.
        return response.data;
    } catch (error) {
        console.log("Error in getConversation api: ", error.message);
    }
};

//Making a front-end api function for sending the new message.
export const sendNewMessage = async (data) => {
    try {
        // Sending a post request to the server.
        await axios.post(`${backendUrl}/sendNewMessage`, data);
    } catch (error) {
        console.log("Error in sendNewMessage api: ", error.message);
    }
};

//Making a front-end api function for getting all messages in a conversation.
export const getMessages = async (conversationId) => {
    try {
        //Sending a get request to the server.
        let response = await axios.get(`${backendUrl}/getMessages?conversationId=${conversationId}`);

        //Returning the response.
        return response.data;
    } catch (error) {
        console.log("Error in getMessages api: ", error.message);
    }
};

//Making a front-end api function for uploading a file. This function receives formData from the frontend component, and sends it to the backend using an axios post request.
export const uploadFile = async (formData) => {
    try {
        // Sending a post request to the server.
        const response = await axios.post(`${backendUrl}/uploadFile`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.log("Error in uploadFile api: ", error.message);
    }
}

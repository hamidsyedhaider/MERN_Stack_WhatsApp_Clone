//Importing the useContext hook.
import { useContext, useEffect, useState } from "react";

//Importing the AccountContext.
import { AccountContext } from "../../../Context/AccountProvider";

//Importing the front-end api functions.
import { getConversation, sendNewMessage, uploadFile } from "../../../Service/Api";

//Importing MaterialUi components
import { Box } from "@mui/material";

//Importing components
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import ChatFooter from "./ChatFooter";

const ChatBox = () => {
    //Importing states and the socket from the AccountContext.
    const { openedChatUser, account, setConversationId, socket, newMessagesFlag, setNewMessagesFlag } = useContext(AccountContext);
    
    //States
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState({});
    const [ file, setFile ] = useState(null);
    const [ filePath, setFilePath ] = useState("");

    useEffect(() => {
        //Getting the conversationId from the database.
        const getConversationDetails = async () => {
            let conversationDetails = await getConversation({ senderId: account.sub, receiverId: openedChatUser.sub });

            await setConversationId(conversationDetails._id);
            await setConversation(conversationDetails);
        };

        getConversationDetails();
    }, [openedChatUser.sub, account.sub, setConversationId]);

    const sendText = async (e) => {
        //console.log(e);
        const code = e.keyCode || e.which;

        if (code === 13) {
            let messageToBeSent;

            if(!file) {
                messageToBeSent = {
                    senderId: account.sub,
                    receiverId: openedChatUser.sub,
                    conversationId: conversation._id,
                    message: message,
                    type: "text",
                };
            } else {
                //Using FormData here because we can't send the file to the backend as it is, we need to convert it into the form data, which will then be handled by the backend.
                const formData = new FormData();
                formData.append("file", file);

                //Now calling the uploadFile front-end api function to upload the file on the backend and get the file path.
                let response = await uploadFile(formData);
                
                setFilePath(response.filePath);

                messageToBeSent = {
                    senderId: account.sub,
                    receiverId: openedChatUser.sub,
                    conversationId: conversation._id,
                    message: response.filePath,
                    type: "file",
                };
            }

            //Now calling the sendMessage hitpoint of the socket to send the message to the receiver.
            socket.current.emit("sendMessage", messageToBeSent);

            //Now calling the newMessage api function in order to send the message to the database.
            await sendNewMessage(messageToBeSent);

            //Clearing the input field.
            setMessage("");
            setFile(null);
            setFilePath("");
            setNewMessagesFlag(prev => !prev);
        }
    };

    return (
        <Box>
            <ChatHeader openedChatUser={openedChatUser} />
            <ChatMain openedChatUser={openedChatUser} newMessagesFlag={newMessagesFlag} />
            <ChatFooter openedChatUser={openedChatUser} setMessage={setMessage} sendText={sendText} message={message} file={file} setFile={setFile} filePath={filePath} setFilePath={setFilePath} />
        </Box>
    );
};

export default ChatBox;
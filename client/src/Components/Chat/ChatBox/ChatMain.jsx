// Importing MaterialUi components
import { Box, styled } from "@mui/material";

// Importing hooks
import { useContext, useEffect, useState, useRef } from "react";

// Importing the context.
import { AccountContext } from "../../../Context/AccountProvider";

// Importing the getMessages api.
import { getMessages } from "../../../Service/Api";

// Importing components
import Message from "./Message";

// Styling the components
const BoxStyled = styled(Box)`
    background-image: url(${`https://th.bing.com/th/id/R.37d4856c3c8c5af1e9cf5b47724645b7?rik=xoSrC2Oxvfyoug&pid=ImgRaw&r=0`});
    background-size: 40%;
`;

const InternalBox = styled(Box)`
    height: 82vh;
    overflow-y: auto;
`;

const MessageContainer = styled(Box)`
    padding: 1px 80px;
`;

const ChatMain = ({ newMessagesFlag }) => {
    // Getting the conversation state from the account context.
    const { conversationId, socket } = useContext(AccountContext);

    // Making a Messages state.
    const [messages, setMessages] = useState([]);

    // Making the incoming message state for message coming from the socket.
    const [incomingMessage, setIncomingMessage] = useState(null);

    const scrollRef = useRef(null);

    // The following useEffect to getMessage from the socket.
    useEffect(() => {
        // The following code is the listener for getMessage emit event when the socket emits a message through this hitpoint. We are setting the incomingMessage state here, after which we will show it in the messages as the latest message. The database will already be updated through the backend of the sender, so there's no need to worry about that. This way we can achieve real time communication between two users.
        socket.current.on("getMessage", data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now(),
            });
        });
    }, [socket]);

    // The following useEffect will make sure that any incoming message is added to the messages state.
    useEffect(() => {
        if (incomingMessage && conversationId === incomingMessage.conversationId) {
            setMessages(prev => [...prev, incomingMessage]);
        }

        // Now resetting the incomingMessage state.
        setIncomingMessage(null);
    }, [incomingMessage, messages, conversationId]);

    // useEffect hook to make sure that the messages are fetched when the component mounts.
    useEffect(() => {
        // getMessages handler function.
        const getMessagesHandler = async (conversationId) => {
            // Calling the api that fetches the messages.
            const data = await getMessages(conversationId);

            // Saving the messages state.
            setMessages(data);
        };

        // Calling the getMessagesHandler function.
        getMessagesHandler(conversationId);
    }, [conversationId, newMessagesFlag]);

    // The following useEffect is to make sure that the latest message is seen first.
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <BoxStyled>
            <InternalBox ref={scrollRef}>
                {messages && messages.map((message, index) => (
                    <MessageContainer key={`${message._id}-${index}`}>
                        <Message message={message} />
                    </MessageContainer>
                ))}
            </InternalBox>
        </BoxStyled>
    );
};

export default ChatMain;

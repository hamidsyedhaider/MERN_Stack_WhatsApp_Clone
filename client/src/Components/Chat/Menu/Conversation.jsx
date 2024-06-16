// Importing MaterialUi components
import { Box, Typography, styled } from "@mui/material";

// Importing the useContext hook to use the context states.
import { useContext, useEffect, useState } from "react";

// Now importing the account context.
import { AccountContext } from "../../../Context/AccountProvider";

// Importing the setConversation and getConversation api.
import { setConversation, getConversation } from "../../../Service/Api";

// Importing the date formatter utility function.
import { formatDate } from "../../../Utils/Utils";

// Styling the components
const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#f0f0f0",
    },
});

const AvatarBox = styled(Box)({
    marginRight: "15px",
    "& img": {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",
    },
});

const ContentBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flex: 1,
});

const HeaderBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const NameStyled = styled(Typography)({
    fontWeight: 500, // Slightly less bold
    fontSize: "16px",
});

const TimestampStyled = styled(Typography)({
    fontSize: "12px",
    color: "#00000099",
});

const MessageStyled = styled(Typography)({
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: "2px", // Reduced margin to bring message closer to the name
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
});

const Conversation = ({ user }) => {
    // Getting states from the account context.
    const { setOpenedChatUser, account, newMessagesFlag, socket } = useContext(AccountContext);

    // State for the latest message in the conversation.
    const [latestMessage, setLatestMessage] = useState({});

    // Adding a useEffect that will call the getConversation api when the component mounts.
    useEffect(() => {
        // Code to run on component mount.
        const getConversationDetails = async () => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub });

            // Setting the latest message state.
            setLatestMessage({ latestMessage: data?.latestMessage, timestamp: data?.updatedAt });
        };

        getConversationDetails();
    }, [user.sub, account.sub, newMessagesFlag]);

    // The following useEffect to getMessage from the socket.
    useEffect(() => {
        // The following code is the listener for getMessage emit event when the socket emits a message through this hitpoint. We are setting the incomingMessage state here, after which we will show it in the messages as the latest message. The database will already be updated through the backend of the sender, so there's no need to worry about that. This way we can achieve real time communication between two users.
        socket.current.on("getMessage", data => {
            //Adding a check that will set the message only if the senderId is the same as the user's sub.
            if (data.senderId === user.sub) {
                setLatestMessage({ latestMessage: data.message, timestamp: data.createdAt});
            }
        });
    }, [socket, user.sub]);

    // getUser handler function.
    const getUser = async () => {
        setOpenedChatUser(user);

        // Now we make an API that makes a conversation between the logged in user and the user whose chat is opened.
        await setConversation({ senderId: account.sub, receiverId: user.sub });
    };

    return (
        <StyledBox onClick={getUser}>
            <AvatarBox>
                <img src={user.picture} alt="dp" />
            </AvatarBox>
            <ContentBox>
                <HeaderBox>
                    <NameStyled>{user.name}</NameStyled>
                    {latestMessage.timestamp && (
                        <TimestampStyled>{formatDate(latestMessage.timestamp)}</TimestampStyled>
                    )}
                </HeaderBox>
                <MessageStyled>
                    {latestMessage?.latestMessage?.includes("uploads") ? "media" : latestMessage.latestMessage}
                </MessageStyled>
            </ContentBox>
        </StyledBox>
    );
};

export default Conversation;

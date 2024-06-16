//Importing the useContext hook.
import { useContext } from "react";

//Importing the AccountContext.
import { AccountContext } from "../../Context/AccountProvider";

//Importing MaterialUI components
import { Dialog, Box, styled } from "@mui/material";

//Component Imports
import Menu from "./Menu/Menu";
import EmptyChat from "./ChatBox/EmptyChat";
import ChatBox from "./ChatBox/ChatBox";

// Styling the Dialog, in the object-wise method.
const DialogStyled = {
    height: "95%",
    maxHeight: "100%",
    display: "flex",
    justifyContent: "flex-start", // Align content to the top
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    boxShadow: "none",
    overflow: "hidden",
    padding: "0", // Reset padding to 0
    margin: "20px", // Corrected margin
    borderRadius: 0,
};

//Styling the Box component so that the children in it come side by side.
const BoxStyled = styled(Box)`
    display: flex;
    width: 100%; // Ensure it takes full width
`;

const LeftBox = styled(Box)`
    flex: 1; // Allow to grow and shrink
    min-width: 300px; // Reduced minimum width threshold
    max-width: 450px; // Reduced maximum width threshold
`;

const RightBox = styled(Box)`
    flex: 2; // Adjust to take remaining space
    border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const ChatDialog = () => {
    //Getting the openedChatUser state from the AccountContext to check whether a chat is opened or not.
    const { openedChatUser } = useContext(AccountContext);

    return (
        <Dialog
            open={true}
            // Adding the styling to the Dialog.
            PaperProps={{ sx: DialogStyled }}
        >
            <BoxStyled>
                <LeftBox>
                    <Menu />
                </LeftBox>
                <RightBox>
                    {   //Adding a condition here to check whether the openedChatUser state is empty or not. If it's empty, then we show the empty chat component, otherwise the ChatBox component.
                        Object.keys(openedChatUser).length ? <ChatBox /> : <EmptyChat />
                    }
                </RightBox>
            </BoxStyled>
        </Dialog>
    );
};

export default ChatDialog;

//Importing MaterialUi components
import { Box, Typography, styled } from "@mui/material";
import { MoreVert, Search } from "@mui/icons-material";

//Importing hooks.
import { useContext } from "react";

//Importing the AccountContext from AccountProvider.
import { AccountContext } from "../../../Context/AccountProvider";

//Styling the components
const StyledParentBox = styled(Box)`
    height: 43px;
    background: #ededed;
    display: flex;
    align-items: center;
    padding: 8px 16px;
`;

const StyledImage = styled("img")`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

const StyledName = styled(Typography)`
    margin-left: 12px !important;
`;

const StyledOnlineStatus = styled(Typography)`
    font-size: 12px;
    margin-left: 12px !important;
    color: rgb(0, 0, 0, 0.6);
`;

const RightContainer = styled(Box)`
    margin-left: auto;

    & > svg {
        padding: 8px;
        font-size: 24px;
        color: #000;
    }
`;

const ChatHeader = ({ openedChatUser }) => {
    //Importing the activeUsers state from the AccountContext.
    const { activeUsers } = useContext(AccountContext);

    return (
        <StyledParentBox>
            <StyledImage src={openedChatUser.picture} alt="dp" />
            <Box>
                <StyledName>{openedChatUser.name}</StyledName>
                <StyledOnlineStatus>{activeUsers.find(user => user.sub === openedChatUser.sub) ? `Online` : `Offline`}</StyledOnlineStatus>
            </Box>
            <RightContainer>
                <Search />
                <MoreVert />
            </RightContainer>
        </StyledParentBox>
    );
};

export default ChatHeader;
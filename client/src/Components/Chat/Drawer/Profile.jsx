//Material UI Imports
import { Box, styled, Typography } from "@mui/material";

//Importing the context
import { useContext } from "react";
import { AccountContext } from "../../../Context/AccountProvider";

//Styling the components
const StyledImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

const StyledImage = styled("img")({
    width: 200,
    height: 200,
    borderRadius: "50%",
    padding: "25px 0",
});

const StyledContainer = styled(Box)`
    background: #ffffff;
    padding: 12px 30px 2px;
    box-shadow: 0 1px 3px rgb(0 0 0 0.08);
    & :first-of-type {
        fontSize: 13px;
        color: #009688;
        font-weight: 300;
    }
    & :last-of-type {
        margin: 14px 0;
        fontSize: 18px;
        color: #4a4a4a;
        font-weight: 300;
    }
`;

const StyledDescriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p {
        fontSize: 13px;
        color: #8696a0;
        font-weight: 400;
    }
`;

const Profile = () => {
    const { account } = useContext(AccountContext);

    return (
        <>
            <StyledImageContainer>
                <StyledImage src={account.picture} alt="dp"></StyledImage>
            </StyledImageContainer>
            <StyledContainer>
                <Typography>Your name</Typography>
                <Typography>{account.name}</Typography>
            </StyledContainer>
            <StyledDescriptionContainer>
                <Typography>This is not your username or pin. This name will be visible to your WhatsApp contacts.</Typography>
            </StyledDescriptionContainer>
            <StyledContainer>
                <Typography>About</Typography>
                <Typography>Eat | Sleep | Code | Repeat</Typography>
            </StyledContainer>
        </>
    )
}

export default Profile;
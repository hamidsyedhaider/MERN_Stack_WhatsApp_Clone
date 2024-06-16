// Importing the useContext hook.
import { useContext } from "react";

// Now importing the context from which we will get the information from.
import { AccountContext } from "../../Context/AccountProvider";

// Imports from Material UI
import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";

// Importing the QR Code image
import { qrCodeImage } from "../../Constants/data";

// Importing the Google Login from OAuth Google Login package.
import { GoogleLogin } from "@react-oauth/google";

// Importing jwt-decode for decoding the encrypted information that GoogleOAuthProvider sends.
import { jwtDecode } from "jwt-decode";

//Importing the api functions
import { addUser } from "../../Service/Api";

// Styling the Dialog, in the object-wise method.
const DialogStyled = {
    backgroundColor: "#ffffff",
    height: "85%",
    display: "flex",
    justifyContent: "flex-start", // Align content to the top
    alignItems: "center",
    width: "60%",
    maxWidth: "100%",
    boxShadow: "none",
    overflow: "hidden",
    padding: "0", // Reset padding to 0
    marginTop: "5%", // Optional: move the dialog down slightly if needed
};

// Now styling the Box, in the template-literal method.
const BoxStyled = styled(Box)`
    display: flex;
    padding: 0 50px 0 0;
    align-items: flex-start; // Align items to the top
    margin: 50px 50px 0 0;
`;

// Now styling the inner box 1.
const Container = styled(Box)`
    padding: 40px 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; // Ensure content is aligned to the top
`;

// Now styling the img tag.
// To style a tag that is not part of Material UI, we need to add that tag as a string in the styled method.
const QRCode = styled("img")({
    height: 264,
    width: 264,
    margin: "40px 0 0 80px",
});

// Now styling the Typography tag to change the styling of the text.
const Title = styled(Typography)`
    font-size: 26px;
    color: #525252;
    font-weight: 300;
    font-family: inherit;
    margin-bottom: 25px;
`;

// Now styling the listitems by adding the style directly on the list parent.
const ListStyled = styled(List)`
    // The symbol "& > li" means that the all the children of this tag will have the following styling.
    & > li {
        font-size: 18px;
        color: #4a4a4a;
        font-weight: 400;
        font-family: inherit;
        margin-bottom: 10px;
        line-height: 20px;
    }
`;

const LoginDialog = () => {
    // Get the setAccount function from the AccountContext
    const { setAccount } = useContext(AccountContext);

    // Define the onLoginSuccess and onLoginFailure functions.
    const onLoginSuccess = async (response) => {
        const decoded = jwtDecode(response.credential);

        setAccount(decoded);

        //Calling the addUser function from the Api.js file in order to save the user in the database.
        await addUser(decoded);
    };

    const onLoginFailure = (response) => {
        console.log(response);
    };

    return (
        <Dialog
            open={true}
            // Adding the styling to the Dialog.
            PaperProps={{ sx: DialogStyled }}

            // The hidebackdrop property is used to hide the backdrop css when the dialog is open.
            hideBackdrop={true}
        >
            <BoxStyled>
                <Container>
                    <Title>To use WhatsApp on your computer:</Title>
                    <ListStyled>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu or Settings and select Linked Devices</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                    </ListStyled>
                </Container>
                <Box style={{ position: "relative" }}>
                    <QRCode src={qrCodeImage} alt="QR Code" />

                    {/* We will be styling the following box so that the google sign in shows on top of the QR Code picture. */}
                    <Box style={{ position: "absolute", top: "50%", transform: "translateX(38%)" }}>
                        <GoogleLogin
                            onSuccess={onLoginSuccess}
                            onError={onLoginFailure}
                        />
                    </Box>
                </Box>
            </BoxStyled>
        </Dialog>
    );
}

export default LoginDialog;

// Importing Material-UI components
import { Box, Typography, Divider, styled } from "@mui/material";

// Styling the components
const StyledBox = styled(Box)`
    background: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center; // Corrected typo
`;

const ContainerBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 20px; // Adjusted padding to be more responsive
`;

const StyledImage = styled("img")({
    width: 400,
    marginBottom: 40, // Adjusted margin
});

const StyledTitle = styled(Typography)`
    font-size: 32px;
    margin: 25px 0 10px 0; // Fixed syntax
    font-family: inherit;
    font-weight: 300;
    color: #41525d;
`;

const StyledSubtitle = styled(Typography)`
    font-size: 14px;
    font-weight: 400;
    font-family: inherit;
    color: #667781;
`;

const StyledDivider = styled(Divider)`
    width: 130%;
    margin: 40px 0;
    opacity: 0.4;
`;

const EmptyChat = () => {
    return (
        <StyledBox>
            <ContainerBox>
                <StyledImage src="https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg" alt="EmptyChat" />
                <StyledTitle>WhatsApp Web</StyledTitle>
                <StyledSubtitle>Now send and receive messages without keeping your phone online.</StyledSubtitle>
                <StyledSubtitle>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</StyledSubtitle>
                <StyledDivider />
            </ContainerBox>
        </StyledBox>
    );
}

export default EmptyChat;

// Importing MaterialUi components.
import { Box, Typography, styled } from "@mui/material";

// Importing MaterialUi icons.
import { GetApp } from '@mui/icons-material';

// Getting the iconpdf icon from constants.
import { iconPDF } from "../../../Constants/data";

// Importing hooks.
import { useContext } from "react";

// Importing the context.
import { AccountContext } from "../../../Context/AccountProvider";

// Importing the fomatDate util.
import { formatDate } from "../../../Utils/Utils";

// Styling the components
const SentMessage = styled(Box)`
    background: #dcf8c6;
    max-width: 60%;
    margin-left: auto;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const ReceivedMessage = styled(Box)`
    background: #ffffff;
    max-width: 60%;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    padding: 4px;
    word-break: keep-all;
    margin-top: auto;
`;

const GetAppStyled = styled(GetApp)`
    margin-right: 10px;
    border: 1px solid grey;
    border-radius: 50%;
    cursor: pointer;
`;

const IconStyled = styled("img")`
    width: 80px;
    cursor: pointer;
`;

const Message = ({ message }) => {
    const { account } = useContext(AccountContext);

    const imageUrl = `http://localhost:3001/getFile?filePath=${message.message}`;

    // Handler function to download the file.
    const downloadFile = (filePath) => {
        // Creating a new anchor element.
        const link = document.createElement("a");

        // Setting the href attribute of the anchor element.
        link.href = `http://localhost:3001/getFile?filePath=${filePath}`;

        // Setting the download attribute of the anchor element.
        link.setAttribute("download", filePath.split("/").pop());

        // Clicking the link.
        link.click();
    };

    const getFileName = (filePath) => {
        return filePath.split("\\").pop();
    };

    return (
        <>
            {
                account.sub === message.senderId ?
                    <SentMessage>
                        {
                            message.type === "file" ?
                                <Box style={{ position: "relative" }}>
                                    {
                                        message?.message?.includes(".pdf") ?
                                            <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <IconStyled src={iconPDF} alt="PDF Icon" onClick={() => {downloadFile(message.message)}} />
                                                <Typography variant="body1" style={{ fontSize: "14px", color: "#333", marginBottom: "auto", marginTop: "15px", }}>
                                                    {getFileName(message.message)}
                                                </Typography>
                                            </Box>
                                        :
                                        message?.message?.includes(".txt") ?
                                            <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <IconStyled src={`https://th.bing.com/th/id/R.bbaa900fe478e029bf582724a9ab2861?rik=T%2blGAcT1m6MzDA&pid=ImgRaw&r=0`} alt="txt Icon" onClick={() => {downloadFile(message.message)}} />
                                                <Typography variant="body1" style={{ fontSize: "14px", color: "#333", marginBottom: "auto", marginTop: "15px", }}>
                                                    {getFileName(message.message)}
                                                </Typography>
                                            </Box>
                                        :
                                            <Box>
                                                <img style={{ width: 300, height: "100%", objectFit: "cover" }} src={imageUrl} alt={message.message} />
                                            </Box>
                                    }
                                    <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
                                        <GetAppStyled onClick={() => { downloadFile(message.message) }} />
                                        {formatDate(message.createdAt)}
                                    </Time>
                                </Box>
                            :
                                <>
                                    <Text>{message.message}</Text>
                                    <Time>{formatDate(message.createdAt)}</Time>
                                </>
                        }
                    </SentMessage>
                :
                    <ReceivedMessage>
                        {
                            message.type === "file" ?
                                <Box style={{ position: "relative" }}>
                                    {
                                        message?.message?.includes(".pdf") ?
                                            <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <IconStyled src={iconPDF} alt="PDF Icon" />
                                                <Typography variant="body1" style={{ fontSize: "14px", color: "#333", marginBottom: "auto", marginTop: "15px", }}>
                                                    {getFileName(message.message)}
                                                </Typography>
                                            </Box>
                                        :
                                        message?.message?.includes(".txt") ?
                                            <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <IconStyled src={`https://th.bing.com/th/id/R.bbaa900fe478e029bf582724a9ab2861?rik=T%2blGAcT1m6MzDA&pid=ImgRaw&r=0`} alt="txt Icon" onClick={() => {downloadFile(message.message)}} />
                                                <Typography variant="body1" style={{ fontSize: "14px", color: "#333", marginBottom: "auto", marginTop: "15px", }}>
                                                    {getFileName(message.message)}
                                                </Typography>
                                            </Box>
                                        :
                                            <Box>
                                                <img style={{ width: 300, height: "100%", objectFit: "cover" }} src={imageUrl} alt={message.message} />
                                            </Box>
                                    }
                                    <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
                                        <GetAppStyled onClick={() => { downloadFile(message.message) }} />
                                        {formatDate(message.createdAt)}
                                    </Time>
                                </Box>
                            :
                                <>
                                    <Text>{message.message}</Text>
                                    <Time>{formatDate(message.createdAt)}</Time>
                                </>
                        }
                    </ReceivedMessage>
            }
        </>
    );
};

export default Message;

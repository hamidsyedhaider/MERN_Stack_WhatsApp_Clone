import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic } from '@mui/icons-material';
import { useEffect } from "react";

const StyledBox = styled(Box)`
    height: 65px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background-color: #ededed;

    & > * {
        margin-right: 5px;
        color: #919191;
    };
`;

const StyledInputBox = styled(Box)`
    background-color: #ffffff;
    height: 45px;
    border-radius: 20px;
    width: calc(94% - 80px);
    padding: 0 10px;
    display: flex;
    align-items: center;
`;

const StyledInputBase = styled(InputBase)`
    width: 100%;
    padding: 10px;
    font-size: 14px;
`;

const ClipIconStyled = styled(AttachFile)`
    rotate: 45deg;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
`;

const ChatFooter = ({ sendText, setMessage, message, file, setFile, setFilePath }) => {
    //Handler function to set the file state when a file is uploaded. Then when the file state is updated, the subsequent useEffect will be invoked and the api will be called.
    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setMessage(selectedFile ? selectedFile.name : "");
    };

    useEffect(() => {
        const uploadFileHandler = async () => {
            if(file) {
                setFile(file);
            }
        };

        uploadFileHandler();
    });

    return (
        <StyledBox>
            <EmojiEmotionsOutlined />
            <label htmlFor="fileInput">
                <ClipIconStyled />
            </label>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={onFileChange}
            />
            <StyledInputBox>
                <StyledInputBase
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => sendText(e)}
                    value={message}
                />
            </StyledInputBox>
            <Mic />
        </StyledBox>
    );
};

export default ChatFooter;

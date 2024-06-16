// Importing the useContext hook.
import { useContext } from "react";

// Importing the accountContext. Remember, always use the named exports method when imported variables or components that are not exported by default.
import { AccountContext } from "../Context/AccountProvider";

// Imports from Material UI
import { AppBar, Toolbar, Box, styled } from "@mui/material";

// Component imports
import LoginDialog from "./Account/LoginDialog";
import ChatDialog from "./Chat/ChatDialog";

// Styling the appbar in the template-literals method.
const LoginHeader = styled(AppBar)`
    height: 220px;
    background-color: #00bfa5;
    box-shadow: none;
`;

// Styling the Box
const Component = styled(Box)`
    height: 100vh;
    background-color: #dcdcdc;
`;

// Styling the appbar for chatHeader in the template-literals method.
const ChatHeader = styled(AppBar)`
    height: 125px;
    background-color: #00A884;
    box-shadow: none;
`;

const Messanger = () => {
  const { account } = useContext(AccountContext);
  
  return (
    <Component>
      {
        /* We have to check whether the user is logged in or not. If he is not logged in, we show the LoginDialog, otherwise we show the ChatDialog. */
        account ?
        <>
          <ChatHeader>
            <Toolbar />
          </ChatHeader>
          <ChatDialog />
        </>
        :
        <>
          <LoginHeader>
            <Toolbar />
          </LoginHeader>
          <LoginDialog />
        </>
      }
    </Component>
  );
};

export default Messanger;

//To create the context, we import the following from react.
import { createContext, useState, useRef, useEffect } from 'react';

//Importing the io function from the socket.io-client library.
import { io } from "socket.io-client";

//Importing the socketio server url fron environmentVariables file in Constants.
import { socketUrl } from "../Constants/environmentVariables";

//Creating the AccountProvider component that will wrap the entire application.
export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();

  //Creating the User state that will save the logged in user's information.
  const [openedChatUser, setOpenedChatUser] = useState({});

  //Creating the conversation state that will save the conversation between the logged in user and the user whose chat is opened.
  const [conversationId, setConversationId] = useState("");

  //State for New Messages Flag
  const [ newMessagesFlag, setNewMessagesFlag] = useState(false);

  //Creating the activeUsers state that will save the active users.
  const [activeUsers, setActiveUsers] = useState([]);

  //Creating the useRef variable that will be used to store the socket.
  const socket = useRef();
  
  //Creating the useEffect hook that will run when the component mounts.
  useEffect(() => {
    socket.current = io(socketUrl);
  }, []);

  return (
    //The AccountContext.Provider gives a value object, in which we can add all the information that the context will provide.
    <AccountContext.Provider value={{
        account,
        setAccount,
        openedChatUser,
        setOpenedChatUser,
        conversationId,
        setConversationId,
        newMessagesFlag,
        setNewMessagesFlag,
        socket,
        activeUsers,
        setActiveUsers,
      }}>
      {children}
    </AccountContext.Provider>
  );
};

//Now we will export the context in the form of this component. Any component that needs the context can import this variable to get the context.
export default AccountProvider;

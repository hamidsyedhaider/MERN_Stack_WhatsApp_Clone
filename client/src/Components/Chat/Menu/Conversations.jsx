// Importing React and useEffect, useState, useContext hooks.
import React, { useEffect, useState, useContext } from "react";

// Importing the getUsers api.
import { getUsers } from "../../../Service/Api";

// Importing Material UI components.
import { Box, Divider, styled } from "@mui/material";

// Importing components
import Conversation from "./Conversation";

// Importing the account context
import { AccountContext } from "../../../Context/AccountProvider";

// Styling the components
const StyledBox = styled(Box)({
  height: "81vh",
  display: "flex",
  flexDirection: "column",
  overflowY: "overlay",
});

const StyledDivider = styled(Divider)({
  margin: "0 0 0 75px",
  opacity: "0.3",
  backgroundColor: "#e9edef",
});

const Conversations = ({ searchText }) => {
  // Creating the users state.
  const [users, setUsers] = useState([]);

  // Getting the account context
  const { account, socket, setActiveUsers } = useContext(AccountContext);

  // useEffect hook to make sure that the data is fetched from the server when the component mounts/renders.
  useEffect(() => {
    // Code to run on component mount
    const fetchData = async () => {
      let response = await getUsers();

      //Now we are filtering the data based on the searchText.
      let filteredResponse = response;
      if (searchText) {
        filteredResponse = response.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()));
      }

      // Setting the users state with the data fetched from the server.
      setUsers(filteredResponse);
    };

    fetchData();
    
    return () => {
      // Code to run on component unmount
    };
  }, [searchText]);

  //The following useEffect is for hitting the addUser endpoint. The data will then be transferred to the socket's addUser hitpoint.
  useEffect(() => {
    if (account) {
      // Emitting the addUser hitpoint to the socket's server.
      socket.current.emit("addUser", account);

      //Listening for the getUsers hitpoint from the socket's server.
      socket.current.on("getUsers", (activeUsers) => {
        setActiveUsers(activeUsers);
      });
    }
  }, [account, socket, setActiveUsers]);

  return (
    <StyledBox>
      {
        users.map((user) => {
          // Ensuring each child has a unique key
          return (
            user.sub !== account.sub &&
              <React.Fragment key={user._id}>
                <Conversation user={user} />
                <StyledDivider />
              </React.Fragment>
          );
        })
      }
    </StyledBox>
  );
};

export default Conversations;

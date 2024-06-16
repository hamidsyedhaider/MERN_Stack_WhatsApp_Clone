//Importing components
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../Drawer/InfoDrawer";

//Importing Mui components
import { Box, styled } from "@mui/material";
import { Chat as MessageIcon } from "@mui/icons-material";

//Importing hooks
import { useContext, useState } from "react";

//Importing the context.
import { AccountContext } from "../../../Context/AccountProvider";

//Styling the components
const StyledBox = styled(Box)({
    height: "60px",
    backgroundColor: "#ededed",
    padding: "8px, 16px",
    display: "flex",
    alignItems: "center",
});

const Image = styled("img")({
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    padding: "12px 16px",
})

const IconsWrapper = styled(Box)({
    marginLeft: "auto",
    "& > *": {
        padding: 8,
    },
    "& > :first-of-type": {
        fontSize: 22,
        marginRight: 8,
    },
});

const Header = () => {
    //States
    const { account } = useContext(AccountContext);
    
    const [openDrawer, setOpenDrawer] = useState(false);

    //Handler functions
    const toggleDrawer = () => {
        setOpenDrawer((prev) => !prev);
    }

    return (
        <>
            <StyledBox>
                <Image onClick={() => {toggleDrawer()}} src={account.picture} alt="dp"></Image>
                <IconsWrapper>
                    <MessageIcon />
                    <HeaderMenu setOpenDrawer={setOpenDrawer} />
                </IconsWrapper>
            </StyledBox>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
        </>
    );
}

export default Header;
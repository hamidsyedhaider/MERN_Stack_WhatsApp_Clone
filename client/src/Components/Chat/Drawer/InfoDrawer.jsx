//Importing Mui componens
import { Drawer, Box, Typography, styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

//Component Imports
import Profile from "./Profile";

//Styling the components
const DrawerStyle = { left: 20, top: 23, height: "95%", width: "24%", shadow: "none"};

const StyledHeader = styled(Box)`
    background: #008069;
    height: 107px;
    color: #ffffff;
    display: flex;
    // justifyContent: space-between;
    // alignItems: center;
    // padding: 10px 20px;
    // borderBottom: 1px solid #d3d3d3;

    & > svg {
        margin-top: auto;
        padding: 17px;
        font-weight: 600;
    }
`;

const StyledTypography = styled(Typography)`
    font-weight: 600;
    padding: 15px;
    margin-top: auto;
    font-size: 18px;
`;

const StyledDrawerBody = styled(Box)`
    background: #ededed;
    height: 85%;
    overflow-y: auto;
`;

//Destructuring the states from the props object that was passed from this component's parent component.
const InfoDrawer = ({ open, setOpen }) => {
    return (
        <Drawer
            open={open}
            onClose={() => {setOpen(false)}}
            
            //We can pass the DrawerStyle as a paper prop to this component.
            PaperProps={{ sx: DrawerStyle }}

            //We are adding the zIndex directly in the style property. I don't know why we didn't style the whole component like this. But eh..
            style={{ zIndex: 1300 }}
        >
            <StyledHeader>
                <ArrowBack onClick={() => {setOpen(false)}} />
                <StyledTypography variant="h6">Profile</StyledTypography>
            </StyledHeader>
            <StyledDrawerBody>
                <Profile />
            </StyledDrawerBody>
        </Drawer>
    )
}

export default InfoDrawer;
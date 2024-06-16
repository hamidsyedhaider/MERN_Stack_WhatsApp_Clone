// Importing Mui components
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem, styled } from "@mui/material";

// Importing hooks
import { useState } from "react";

// Styling the Mui components
const StyledMenuItem = styled(MenuItem)({
    fontSize: "14px",
    padding: "10px 20px",
    color: "#4a4a4a",
    "&:hover": {
        backgroundColor: "#f2f2f2",
    },
});

const HeaderMenu = ({ setOpenDrawer }) => {
    const [open, setOpen] = useState(null);
    
    const handleClose = () => {
        setOpen(null);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.reload();
    }

    return (
        <>
            <MoreVert onClick={(e) => setOpen(e.currentTarget)} />
            <Menu
                id="basic-menu"
                anchorEl={open}
                keepMounted
                open={Boolean(open)} // Ensure open is a boolean
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                MenuListProps={{
                    autoFocusItem: false, // Prevent automatic focus on menu items
                }}
            >
                {/* Hidden dummy item to prevent initial focus */}
                <MenuItem style={{ display: 'none' }} />
                <StyledMenuItem onClick={() => { handleClose(); setOpenDrawer(true); }}>Profile</StyledMenuItem>
                <StyledMenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</StyledMenuItem>
            </Menu>
        </>
    );
}

export default HeaderMenu;

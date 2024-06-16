// Material UI Imports
import { Box, InputBase, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// Styling the Mui components using object method
const StyledBox = styled(Box)({
    backgroundColor: "#fff", // White background for the parent box
    height: "40px", // Reduced height
    borderBottom: "1px solid #f2f2f2",
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
});

const SearchContainer = styled(Box)({
    backgroundColor: "#f0f0f0", // Light gray background for the search area
    borderRadius: "10px", // Rounded corners
    display: "flex",
    alignItems: "center",
    padding: "3px 8px", // Reduced padding for a smaller height
    width: "100%",
});

const IconWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#919191",
    paddingLeft: "5px", // Reduced padding
});

const StyledInputBase = styled(InputBase)({
    marginLeft: "8px", // Reduced margin
    flex: 1,
});

const Search = ({ setSearchText }) => {
    return (
        <StyledBox>
            <SearchContainer>
                <IconWrapper>
                    <SearchIcon
                        fontSize="small"
                    />
                </IconWrapper>
                <StyledInputBase
                    placeholder="Search or start a new chat"
                    onChange={(e) => {setSearchText(e.target.value)}}
                />
            </SearchContainer>
        </StyledBox>
    );
}

export default Search;

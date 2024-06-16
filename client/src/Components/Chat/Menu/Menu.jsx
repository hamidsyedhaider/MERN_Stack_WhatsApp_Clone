//Importing components
import Conversations from "./Conversations";
import Header from "./Header";
import Search from "./Search";

//Importing the hooks
import { useState } from "react";

const Menu = () => {
    //Creating the state for the search value
    const [searchText, setSearchText] = useState("");

    return (
        <>
            <Header />
            <Search setSearchText={setSearchText} />
            <Conversations searchText={searchText} />
        </>
    )
}

export default Menu;

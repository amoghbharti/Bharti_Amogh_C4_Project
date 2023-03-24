import "./SearchBar.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    return <TextField
        className="searchBar"
        size="small"
        variant="outlined"
        placeholder="Search..."
        InputProps={{
            classes: {
                root: "searchInput",
                notchedOutline: "searchInputOutline"
            },
            startAdornment: (
                <InputAdornment position="start" sx={{ color: "inherit" }} disablePointerEvents>
                    <SearchIcon color="inherit" />
                </InputAdornment>
            ),
        }}
    />
}

export default SearchBar;
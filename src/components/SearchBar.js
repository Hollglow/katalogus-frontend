import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({ callback }) => {
  const handleSearch = (value) => {
    callback(value);
  };
  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      label="Search"
      variant="outlined"
      onChange={(event) => {
        handleSearch(event.target.value);
      }}
    ></TextField>
  );
};

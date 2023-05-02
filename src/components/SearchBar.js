import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({callback}) => {
  const handleSearch = (value) => {
    callback(value);
  }
  return(
    <Container sx={{width: 'fit-content'}}>
      <TextField InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon/>
          </InputAdornment>
        )
      }} sx={{display: 'inline-block', margin: 2}} 
      label="Search" variant="outlined" onChange={(event) => {handleSearch(event.target.value)}}></TextField> 
     
    </Container>
  );
}
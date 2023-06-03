import { Autocomplete, TextField } from "@mui/material";

export const ClassSelector = (props) => {
  const handleSelectedValueChange = (event, newValue) => {
    props.callback(newValue);
  };

  return (
    <Autocomplete
      sx={{ minWidth: 150 }}
      id="combo-box"
      options={props.options}
      onChange={handleSelectedValueChange}
      renderInput={(params) => <TextField {...params} label="Osztály" />}
    />
  );
};

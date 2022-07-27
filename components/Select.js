import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

const SelectSoda = styled(TextField)({
  width: `220px`,
  height: `79px`,
  margin: `0px`,
});

export default function Select(props) {
  return (
    <>
      <SelectSoda
        variant="outlined"
        size="medium"
        label={`Refresco`}
        helperText={`Selecciona un refresco`}
        onChange={(e) => props.setSoda(e.target.value)}
        select
      >
        {props.items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </SelectSoda>
    </>
  );
}

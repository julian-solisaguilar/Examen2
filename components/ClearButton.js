import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

const ActionButton = styled(Button)({
  height: `42px`,
  margin: `0px`,
});

export default function ClearButton(props) {
  return (
    <>
      <Tooltip title="Vaciar Carrito" arrow placement="bottom">
        <ActionButton
          variant="contained"
          size="large"
          color={props.color}
          type="submit"
          onClick={props.onClick}
        >
          <DeleteIcon />
        </ActionButton>
      </Tooltip>
    </>
  );
}

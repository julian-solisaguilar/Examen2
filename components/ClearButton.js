import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const ActionButton = styled(Button)({
  height: `42px`,
  margin: `0px`,
});

export default function SubmitButton(props) {
  return (
    <>
      <ActionButton
        variant="contained"
        size="large"
        color={props.color}
        type="submit"
        onClick={props.onClick}
      >
        <DeleteIcon />
      </ActionButton>
    </>
  );
}

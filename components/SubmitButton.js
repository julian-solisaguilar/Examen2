import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ActionButton = styled(Button)({
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
        {" "}
        {props.text}{" "}
      </ActionButton>
    </>
  );
}

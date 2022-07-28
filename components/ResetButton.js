import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ResetIcon from "@mui/icons-material/ReplayOutlined";
import { Tooltip } from "@mui/material";

const ActionButton = styled(Button)({
  height: `42px`,
  margin: `0px`,
});

export default function ResetButton(props) {
  return (
    <>
      <Tooltip title="Reiniciar Maquinita" arrow placement="bottom">
        <ActionButton
          variant="contained"
          size="large"
          color={props.color}
          type="submit"
          onClick={props.onClick}
        >
          <ResetIcon />
        </ActionButton>
      </Tooltip>
    </>
  );
}

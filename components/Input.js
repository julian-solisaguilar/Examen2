import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const InputAmount = styled(TextField)({
  width: `220px`,
  height: `79px`,
  margin: `0px`,
});

export default function Input(props) {
  const handleAmountChange = (event) => {
    props.setInput(event.target.value);
  }

  return (
    <>
      <InputAmount
        value={props.input}
        variant="outlined"
        size="medium"
        label={`Cantidad de Refrescos`}
        type="number"
        required={true}
        onChange={handleAmountChange}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 2);
        }}
      />
    </>
  );
}

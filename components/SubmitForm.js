import {
  TextField,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SubmitButton from "./SubmitButton";
import Select from "./Select";
import Input from "./Input";

const InputAmount = styled(TextField)({
  width: `220px`,
  height: `79px`,
  margin: `0px`,
});

export default function SubmitForm(props) {

  const items = [
    { value: "CocaCola", label: "CocaCola" },
    { value: "Pepsi", label: "Pepsi" },
    { value: "Fanta", label: "Fanta" },
    { value: "Sprite", label: "Sprite" },
  ];

  return (
    <>
      <Select setSoda={props.setSoda} items={items} />
      <Input setAmount={props.setAmount} />
      <SubmitButton onClick={props.addToCart} text={"Agregar al Carrito"} color="primary" />
    </>
  );
}

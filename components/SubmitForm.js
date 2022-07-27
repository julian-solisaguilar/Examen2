import SubmitButton from "./SubmitButton";
import Select from "./Select";
import Input from "./Input";

export default function SubmitForm(props) {

  const items = [
    { value: "CocaCola", label: "CocaCola" },
    { value: "Pepsi", label: "Pepsi" },
    { value: "Fanta", label: "Fanta" },
    { value: "Sprite", label: "Sprite" },
  ];

  return (
    <>
      <Select setSoda={props.setSoda} items={items} value={props.value}/>
      <Input setAmount={props.setAmount} />
      <SubmitButton onClick={props.addToCart} text={"Agregar al Carrito"} color="primary" />
    </>
  );
}

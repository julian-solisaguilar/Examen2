import SubmitButton from "./SubmitButton";
import Select from "./Select";
import Input from "./Input";
import { useState, useEffect } from "react";

export default function SubmitForm(props) {
  const items = [
    { value: "CocaCola", label: "CocaCola" },
    { value: "Pepsi", label: "Pepsi" },
    { value: "Fanta", label: "Fanta" },
    { value: "Sprite", label: "Sprite" },
  ];
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input !== "") {
      props.addToCart();
      setInput("");
    }
  };

  useEffect(() => {
    if (input !== "") {
      props.setAmount(parseInt(input));
    } else {
      props.setAmount(0);
    }
  }, [input]);

  return (
    <>
      <Select setSoda={props.setSoda} items={items} value={props.value} />
      <Input input={input} setInput={setInput} />
      <SubmitButton
        onClick={handleSubmit}
        text={"Agregar al Carrito"}
        color="primary"
        disabled={props.disabled ? false : true}
      />
    </>
  );
}

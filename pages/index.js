import { List, ListItem, ListItemText } from "@mui/material";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import SubmitForm from "../components/SubmitForm";
import SubmitButton from "../components/SubmitButton";
import ClearButton from "../components/ClearButton";

const CartItem = styled(ListItem)({
  width: `260px`,
  height: `68px`,
  display: `flex`,
  flexDirection: `row`,
  justifyContent: `flex-end`,
  alignItems: `center`,
  padding: `8px 16px`,
  background: `rgba(0, 0, 0, 0.04)`,
  boxShadow: `inset 0px -1px 0px rgba(0, 0, 0, 0.12)`,
});

export default function Home() {
  const [soda, setSoda] = useState("");
  const [amount, setAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const [cans, setCans] = useState([
    { soda: "CocaCola", amount: 10, price: 500 },
    { soda: "Pepsi", amount: 8, price: 600 },
    { soda: "Fanta", amount: 10, price: 550 },
    { soda: "Sprite", amount: 15, price: 725 },
  ]);
  const [coins, setCoins] = useState([
    { value: 500, amount: 20 },
    { value: 100, amount: 30 },
    { value: 50, amount: 50 },
    { value: 25, amount: 25 },
  ]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const getItems = () => {
    if (cart.length > 0) {
      return cart.map((item, index) => {
        return (
          <CartItem key={index}>
            <ListItemText
              primary={item.soda + " x " + `\u20A1` + item.price}
              secondary={"Cantidad de unidades: " + item.amount}
            />
          </CartItem>
        );
      });
    } else {
      return <ListItemText primary="No hay nada en el carrito" />;
    }
  };

  const getTotal = () => {
    if (cart.length > 0) {
      return cart.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0);
    } else {
      return 0;
    }
  };

  const addToCart = () => {
    if (soda !== "" && amount > 0) {
      let price = 0;
      cans.find((can) => {
        if (can.soda === soda) {
          price = can.price;
        }
      });
      setCart([...cart, { soda: soda, amount: amount, price: price }]);
    }
  };

  const completePurchase = () => {
    console.log("Pago completado");
    setCart([]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <div className={styles.Title}>
        <h1 className={styles.Title_header}>
          EXAMEN 2 - INGENIERIA DE SOFTWARE - PARTE 2 - B97634
        </h1>
      </div>
      <div className={styles.Container}>
        <div className={styles.Machine}>
          <img src="../maquinita_1.png" alt="machine" />
          <div className={styles.Inputs}>
            <SubmitForm
              addToCart={addToCart}
              setAmount={setAmount}
              setSoda={setSoda}
            />
          </div>
        </div>
        <div className={styles.Cart}>
          <ShoppingCartIcon color="primary" />
          <div className={styles.Items}>
            <List>{getItems()}</List>
          </div>
          {getTotal()}
          <div className={styles.Buttons}>
            <SubmitButton
              onClick={completePurchase}
              text="Comprar"
              color="primary"
            />
            <ClearButton onClick={clearCart} color="error" />
          </div>
        </div>
      </div>
    </>
  );
}

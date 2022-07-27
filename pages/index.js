import { List, ListItem, ListItemText } from "@mui/material";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import SubmitForm from "../components/SubmitForm";
import SubmitButton from "../components/SubmitButton";
import ClearButton from "../components/ClearButton";
import Product from "../components/Product";

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
    { soda: "CocaCola", amount: 10, price: 500, src: "CocaCola.svg" },
    { soda: "Pepsi", amount: 8, price: 600, src: "Pepsi.svg" },
    { soda: "Fanta", amount: 10, price: 550, src: "Fanta.svg" },
    { soda: "Sprite", amount: 15, price: 725, src: "Sprite.svg" },
  ]);
  const [coins, setCoins] = useState([
    { value: 500, amount: 20 },
    { value: 100, amount: 30 },
    { value: 50, amount: 50 },
    { value: 25, amount: 25 },
  ]);

  useEffect(() => {
    let key = cart.length;
    let canToSubstract = "";
    let amountToSubstract = 0;
    cart.find((item) => {
      if (key === item.key) {
        canToSubstract = item.soda;
        amountToSubstract = item.amount;
      }
    });
    console.log(canToSubstract, amountToSubstract);
    //update cans amount
    setCans((prevCans) =>
      prevCans.map((can) => {
        if (can.soda === canToSubstract) {
          can.amount = can.amount - amountToSubstract;
        }
        return can;
      }
      )
    );
    console.log(cans);
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
      setCart([
        ...cart,
        { soda: soda, amount: amount, price: price, key: cart.length },
      ]);
    }
  };

  const completePurchase = () => {
    console.log("Pago completado");
    setCart([]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getProducts = () => {
    return cans.map((can, index) => {
      return (
        <Product
          key={index}
          image={can.src}
          name={can.soda}
          amount={can.amount}
          price={can.price}
        />
      );
    });
  };

  return (
    <>
      <div className={styles.Title}>
        <h1 className={styles.TitleHeader}>
          EXAMEN 2 - INGENIERIA DE SOFTWARE - PARTE 2 - B97634
        </h1>
      </div>
      <div className={styles.Container}>
        <div className={styles.Cans}>{getProducts()}</div>
        <div className={styles.Machine}>
          <img src="../maquinita_1.png" alt="machine" />
          <div className={styles.Inputs}>
            <SubmitForm
              addToCart={addToCart}
              setAmount={setAmount}
              setSoda={setSoda}
              value={soda}
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

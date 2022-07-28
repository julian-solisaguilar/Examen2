import { List, ListItem, ListItemText } from "@mui/material";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import SubmitForm from "../components/SubmitForm";
import SubmitButton from "../components/SubmitButton";
import ClearButton from "../components/ClearButton";
import Product from "../components/Product";
import ResetButton from "../components/ResetButton";
import { convertToString } from "../logic/convertToString";
import { calculatePurchase } from "../logic/calculatePurchase";
import ModalPago from "../components/ModalPago";

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

const Quinientos = 500;
const Cien = 100;
const Cincuenta = 50;
const Veinticinco = 25;
const colonSign = `\u20A1`;

export default function Home() {
  const [totalAmount, setTotalAmount] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [fullPrice, setFullPrice] = useState(0);
  const [soda, setSoda] = useState("");
  const [amount, setAmount] = useState(0);
  const [isValidSelection, setIsValidSelection] = useState(false);
  const [cart, setCart] = useState([]);
  const defaultCans = [
    { soda: "CocaCola", amount: 10, price: 500, src: "CocaCola.svg" },
    { soda: "Pepsi", amount: 8, price: 600, src: "Pepsi.svg" },
    { soda: "Fanta", amount: 10, price: 550, src: "Fanta.svg" },
    { soda: "Sprite", amount: 15, price: 725, src: "Sprite.svg" },
  ];
  const [cans, setCans] = useState([
    { soda: "CocaCola", amount: 10, price: 500, src: "CocaCola.svg" },
    { soda: "Pepsi", amount: 8, price: 600, src: "Pepsi.svg" },
    { soda: "Fanta", amount: 10, price: 550, src: "Fanta.svg" },
    { soda: "Sprite", amount: 15, price: 725, src: "Sprite.svg" },
  ]);
  const defaultCoins = [
    { value: Quinientos, amount: 20 },
    { value: Cien, amount: 30 },
    { value: Cincuenta, amount: 50 },
    { value: Veinticinco, amount: 25 },
  ];
  const [coins, setCoins] = useState([
    { value: Quinientos, amount: 20 },
    { value: Cien, amount: 30 },
    { value: Cincuenta, amount: 50 },
    { value: Veinticinco, amount: 25 },
  ]);

  useEffect(() => {
    if (isValidSelection) {
      substractCan();
    }
  }, [cart]);

  useEffect(() => {
    checkSelection();
  }, [soda, amount]);

  const substractCan = () => {
    setCans(
      cans.map((can) => {
        if (can.soda === soda) {
          can.amount -= amount;
        }
        return can;
      })
    );
  };

  const checkSelection = () => {
    let selection = cans.find((can) => can.soda === soda);
    if (soda && amount) {
      if (selection.amount >= amount) {
        setIsValidSelection(true);
      } else {
        setIsValidSelection(false);
      }
    } else {
      setIsValidSelection(false);
    }
  };

  const getItems = () => {
    if (cart.length > 0) {
      return cart.map((item, index) => {
        return (
          <CartItem key={index}>
            <ListItemText
              primary={item.soda + " x " + colonSign + item.price}
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
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += item.price * item.amount;
      });
      let priceString = convertToString(totalPrice);
      return <ListItemText primary={"Total: " + colonSign + priceString} />;
    } else {
      return <ListItemText primary={"Total: " + colonSign + "0"} />;
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
    let purchase = calculatePurchase(cart, coins);
    if (purchase.length > 0) {
      for (let i = 0; i < purchase.length; i++) {
        let coin = purchase[i];
        let coinIndex = coins.findIndex((c) => c.value === coin.value);
        coins[coinIndex].amount -= coin.amount;
      }
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.amount;
      });
      setFullPrice(total);
      setTotalAmount(purchase);
      setIsOpen(true);
    } else {
      console.log("No se pudo completar el pago");
    }
    setCart([]);
  };

  const clearCart = () => {
    setCart([]);
    setCans(defaultCans);
  };

  const resetMachine = () => {
    setCart([]);
    setCans(defaultCans);
    setCoins(defaultCoins);
    setSoda("");
    setAmount(0);
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
      <ModalPago
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={totalAmount}
        total={fullPrice}
      />
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
              disabled={isValidSelection}
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
            <ResetButton onClick={resetMachine} color="warning" />
          </div>
        </div>
      </div>
    </>
  );
}

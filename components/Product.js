import styles from "../styles/Product.module.css";

export default function Product(props) {
  return (
    <>
      <div className={styles.Product}>
        <img src={props.image} alt={props.name}/>
        <div className={styles.ProductProps}>
          {"x" + props.amount}<br/>
          {`\u20A1` + props.price}
        </div>
      </div>
    </>
  );
}

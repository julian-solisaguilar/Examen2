export function convertToString(price) {
  let priceString = price.toString();
  if(priceString.length >= 4) {
    let thousands = priceString.substring(0, priceString.length - 3);
    let decimals = priceString.substring(priceString.length - 3);
    priceString = thousands + "." + decimals;
  }
  priceString += ",00";
  return priceString;
}

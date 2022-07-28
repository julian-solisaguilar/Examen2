export function calculatePurchase(cart, coins) {
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.amount;
  });
  let fiveHundredCoins = calculateFiveHundred(total, coins);
  total -= fiveHundredCoins * 500;
  let hundredCoins = calculateHundred(total, coins);
  total -= hundredCoins * 100;
  let fiftyCoins = calculateFifty(total, coins);
  total -= fiftyCoins * 50;
  let twentyFiveCoins = calculateTwentyFive(total, coins);
  total -= twentyFiveCoins * 25;
  if (total === 0) {
    let totalCoinsArray = [
      { amount: fiveHundredCoins, value: 500 },
      { amount: hundredCoins, value: 100 },
      { amount: fiftyCoins, value: 50 },
      { amount: twentyFiveCoins, value: 25 },
    ];
    return totalCoinsArray;
  } else {
    return [];
  }
}

const calculateFiveHundred = (total, coins) => {
  let fiveHundredCoins = 0;
  coins.find((coin) => {
    if (coin.value === 500) {
      fiveHundredCoins = coin.amount;
    }
  });
  let amountNeeded = Math.floor(total / 500);
  if (amountNeeded > fiveHundredCoins) {
    return fiveHundredCoins;
  } else {
    return amountNeeded;
  }
};

const calculateHundred = (total, coins) => {
  let hundredCoins = 0;
  coins.find((coin) => {
    if (coin.value === 100) {
      hundredCoins = coin.amount;
    }
  });
  let amountNeeded = Math.floor(total / 100);
  if (amountNeeded > hundredCoins) {
    return hundredCoins;
  } else {
    return amountNeeded;
  }
};

const calculateFifty = (total, coins) => {
  let fiftyCoins = 0;
  coins.find((coin) => {
    if (coin.value === 50) {
      fiftyCoins = coin.amount;
    }
  });
  let amountNeeded = Math.floor(total / 50);
  if (amountNeeded > fiftyCoins) {
    return fiftyCoins;
  } else {
    return amountNeeded;
  }
};

const calculateTwentyFive = (total, coins) => {
  let twentyFiveCoins = 0;
  coins.find((coin) => {
    if (coin.value === 25) {
      twentyFiveCoins = coin.amount;
    }
  });
  let amountNeeded = Math.floor(total / 25);
  if (amountNeeded > twentyFiveCoins) {
    return twentyFiveCoins;
  } else {
    return amountNeeded;
  }
};

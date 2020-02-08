// ========================================================

// PRINTING FUNCTIONS

// ========================================================

// Prints the current way
const printPocket = (p, n, d, q) => {
  let string = "";
  if (q > 0) {
    string += `Quarters: ${q}`;
  }
  if (d > 0) {
    string += `${addComma(string)}Dimes: ${d}`;
  }
  if (n > 0) {
    string += `${addComma(string)}Nickles: ${n}`;
  }
  if (p > 0) {
    string += `${addComma(string)}Pennies: ${p}`;
  }
  console.log(string);
};

// Add's a comma if necessary
const addComma = str => {
  if (str === "") {
    return "";
  } else {
    return ", ";
  }
};

// ========================================================

// CONVERTING TO SECOND HIGHEST COIN
// When 1 of the highest coin is left, it converts that coin into the next highest coins
// Example: 1 quarter becomes 2 dimes and a nickel

// ========================================================

const makeBiggest = (p, n, d, q) => {
  if (q == 1) {
    if (p > 5) {
      n += Math.floor(p / 5);
      p = p % 5;
    }
    if (n > 2) {
      d += Math.floor(n / 2);
      n = n % 2;
    }
    q = 0;
    d += 2;
    n += 1;
  } else if (d == 1) {
    if (p > 5) {
      n += Math.floor(p / 5);
      p = p % 5;
    }
    d = 0;
    n += 2;
  }
  coinEnumeration(p, n, d, q);
};

// ========================================================

// RECURSIVE FUNCTION THAT GETS ALL POSSIBLE COIN ARRANGEMENTS
// Starts with highest denominations, and works down until the arrangement is 100% pennies

// ========================================================

const coinEnumeration = (p, n, d, q) => {
  printPocket(p, n, d, q);
  if (q > 0) {
    if (d > 0) {
      if (n > 0) {
        coinEnumeration(p + 5, n - 1, d, q);
      } else {
        coinEnumeration(p, n + 2, d - 1, q);
      }
    } else {
      if (q == 1) {
        makeBiggest(p, n, d, q);
      } else {
        coinEnumeration(p, n + 1, d + 2, q - 1);
      }
    }
  } else if (d > 0) {
    if (n > 0) {
      coinEnumeration(p + 5, n - 1, d, q);
    } else {
      if (d == 1) {
        makeBiggest(p, n, d, q);
      } else {
        coinEnumeration(p, n + 2, d - 1, q);
      }
    }
  } else if (n > 0) {
    coinEnumeration(p + 5, n - 1, d, q);
  }
};

// ========================================================

// WAYS FUNCTION
// Enter amount in pennies, and it will run the recursive function
// This function handles the base case
// Example: Takes 25 and runs coinEnumeration(0, 0, 0, 1);

// ========================================================

const ways = x => {
  let p1, n1, d1, q1;
  if (x >= 25) {
    q1 = Math.floor(x / 25);
    x -= q1 * 25;
  } else {
    q1 = 0;
  }
  if (x >= 10) {
    d1 = Math.floor(x / 10);
    x -= d1 * 10;
  } else {
    d1 = 0;
  }
  if (x >= 5) {
    n1 = Math.floor(x / 5);
    x -= n1 * 5;
  } else {
    n1 = 0;
  }
  p1 = x;
  coinEnumeration(p1, n1, d1, q1);
};

// Run the ways function
ways(30);

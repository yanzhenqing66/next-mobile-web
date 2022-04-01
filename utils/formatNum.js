

function formatNum(num) {
  return parseFloat(num).toLocaleString()
}

function formatKW(num, digits=1) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    // { value: 1E4, symbol: "W" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export { formatNum, formatKW }
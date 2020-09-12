import "alpinejs";

const shortMonthName = (monthNum = 0) => {
  return new Date(1, monthNum, 1).toLocaleString("default", {
    month: "short"
  });
};

const longMonthName = (monthNum = 0) => {
  return new Date(1, monthNum, 1).toLocaleString("default", {
    month: "long"
  });
};

window.initApp = function(hugoFoods) {
  return {
    foods: hugoFoods,
    month: new Date().getMonth(),
    shortMonthName(monthNum) {
      return shortMonthName(monthNum);
    },
    longMonthName(monthNum) {
      return longMonthName(monthNum);
    }
  };
}

import "alpinejs";

const filterFoods = (foods, shortMonthName) => {
  shortMonthName = shortMonthName.toLowerCase();
  return foods.filter(food => {
    return food.best[shortMonthName];
  });
}

const shortMonthName = (monthNum = 0) => {
  return new Date(1, monthNum, 1).toLocaleString("default", {
    month: "short"
  })
}

window.initApp = function(hugoFoods) {
  return {
    foods: filterFoods(
      hugoFoods,
      shortMonthName()
    ),
    all: hugoFoods,
    month: new Date().getMonth(),
    prevMonth() {
      this.month--;
      this.foods = filterFoods(hugoFoods, shortMonthName(this.month));
    },
    nextMonth() {
      this.month++;
      this.foods = filterFoods(hugoFoods, shortMonthName(this.month));
    }
  };
}

import "alpinejs";

const shortMonthName = (monthNum = 0) => {
  return new Date(1, monthNum, 1).toLocaleString("default", {
    month: "short"
  })
}

window.initApp = function(hugoFoods) {
  return {
    foods: hugoFoods,
    month: new Date().getMonth(),
    prevMonth() {
      this.month--;
    },
    nextMonth() {
      this.month++;
    },
    countVisible(items) {
      return items.reduce((carry, item) => { return carry + (item.best[shortMonthName(this.month)] ? 1 : 0)}, 0);
    },
    shortMonthName(monthNum) {
      return shortMonthName(monthNum);
    }
  };
}

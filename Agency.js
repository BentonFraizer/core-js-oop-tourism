class Agency {
  constructor(money, tours = []) {
    this.money = money;
    this.tours = tours;
  }

  availableToursCount() {
    return this.tours.length;
  }

  findTour(countryName) {
    return this.tours.find((tour) => tour.country === countryName);
  }

  sell(countryName) {
    let indexOfDeletingTour;
    if (this.tours.every((tour) => tour.country !== countryName)) {
      return undefined;
    }
    const tourForSell = this.tours.filter((tour) => tour.country === countryName);
    this.money += tourForSell[0].price;
    this.tours.forEach((tour, index) => {
      if (tour.country === countryName) {
        indexOfDeletingTour = index;
      }
    });
    this.tours.splice(indexOfDeletingTour, 1);
    return tourForSell[0];
  }
}

module.exports = Agency;

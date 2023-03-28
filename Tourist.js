class Tourist {
  constructor(name, age, tours = []) {
    this.name = name;
    this.age = age;
    this.tours = tours;
  }

  buy(countryName, agency) {
    const hasTour = Boolean(agency.findTour(countryName));
    const wantedTour = agency.sell(countryName);
    this.tours.push(wantedTour);
    return hasTour;
  }
}

module.exports = Tourist;

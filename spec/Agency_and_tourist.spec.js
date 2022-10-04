const Tourist = require('../Tourist');
const Tour = require('../Tour');
const Agency = require('../Agency');

describe('Тестирование турагенства', () => {
  let turkey;
  let egypt;
  let india;
  let thailand;
  let agency;
  const startMoney = 50000;
  const max = new Tourist('Max', 32);
  const helen = new Tourist('Helen', 28);
  beforeEach(() => {
    turkey = new Tour('Turkey', 70000);
    egypt = new Tour('Egypt', 85000);
    india = new Tour('India', 100000);
    thailand = new Tour('Thailand', 105000);
    agency = new Agency(startMoney, [turkey, egypt, india, thailand]);
  });

  describe('availableToursCount', () => {
    it('возвращает количество доступных к покупке туров', () => {
      expect(agency.availableToursCount()).toEqual(4);
    });
  });

  describe('findTour', () => {
    describe('если находится тур по названию - вернуть его', () => {
      it('возвращает интересующий туриста тур', () => {
        expect(agency.findTour('India')).toEqual(india);
      });
    });

    describe('поиск тура в страну, которой нет в агенстве', () => {
      it('если тура в желаемую страну нет, то вернуть undefined', () => {
        expect(agency.findTour('Brazil')).toBeUndefined();
      });
    });
  });

  describe('турист пробует купить тур, а агенство продать', () => {
    describe('агенство продаёт тур (sell)', () => {
      it('возвращает проданный тур', () => {
        expect(agency.sell('Egypt')).toBe(egypt);
      });

      it('после продажи тура количество денег агентства увеличивается', () => {
        agency.sell('Egypt');
        agency.sell('Thailand');
        expect(agency.money).toBe(startMoney + egypt.price + thailand.price);
      });

      it('проданный тур пропадает из списка доступных туров', () => {
        agency.sell('Egypt');
        expect(agency.tours).not.toContain(egypt);
      });
    });

    describe('агенство пытается продать тур (sell), в страну, которой нет в списке доступных', () => {
      it('returns undefined', () => {
        expect(agency.sell('Brazil')).toBeUndefined();
      });
    });

    describe('турист пробует купить тур (buy)', () => {
      it('возвращает true если тур найден в агенстве и продан', () => {
        expect(max.buy('Thailand', agency)).toEqual(true);
      });
      it('возвращает false если тур не найден и не может быть продан', () => {
        expect(max.buy('Colombia', agency)).toEqual(false);
      });
    });

    describe('турист покупает тур', () => {
      beforeEach(() => {
        max.buy('Thailand', agency);
        helen.buy('Maldives', agency);
      });

      it('турист становится владельцем существующего тура', () => {
        expect(max.tours).toContain(thailand);
      });

      it('проданные туры пропадают у агенства, оно получает деньги за туры', () => {
        expect(agency.tours).not.toContain(thailand);
        expect(agency.money).toBe(startMoney + thailand.price);
      });

      it('у туриста нет туров, которые он не купил', () => {
        expect(helen.tours).not.toContain(thailand);
      });
    });
  });
});

const Tourist = require('../Tourist');

describe('Tourist', () => {
  let amelia;
  beforeEach(() => {
    amelia = new Tourist('Amelia', 25);
  });

  it('у туриста есть имя', () => {
    expect(amelia.name).toEqual('Amelia');
  });

  it('у туриста устанавливается указанный возраст', () => {
    expect(amelia.age).toEqual(25);
  });
  it('изначально у туриста нет купленных туров', () => {
    expect(amelia.tours).toEqual([]);
  });
});

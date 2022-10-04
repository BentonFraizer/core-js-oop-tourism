const Tour = require('../Tour');

describe('Tour', () => {
  let turkey;
  beforeEach(() => {
    turkey = new Tour('Turkey', 70000);
  });

  it('у тура в страну есть название', () => {
    expect(turkey.country).toEqual('Turkey');
  });

  it('у тура в страну есть цена', () => {
    expect(turkey.price).toEqual(70000);
  });
});

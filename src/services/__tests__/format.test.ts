import format from '../format';

describe('Format toPrice', () => {
  it('+++ Should return Bø 0.00', () => {
    const price = format.toPrice(0);
    expect(price).toBe('Bø 0.00');
  });
  it('+++ Should return Bø0.99', () => {
    const price = format.toPrice(99);
    expect(price).toBe('Bø0.99');
  });
  it('+++ Should return Bø1.00', () => {
    const price = format.toPrice(100);
    expect(price).toBe('Bø1.00');
  });
  it('+++ Should return Bø1.01', () => {
    const price = format.toPrice(101);
    expect(price).toBe('Bø1.01');
  });
  it('+++ Should return -Bø0.99', () => {
    const price = format.toPrice(-99);
    expect(price).toBe('-Bø0.99');
  });
  it('+++ Should return -Bø1.00', () => {
    const price = format.toPrice(-100);
    expect(price).toBe('-Bø1.00');
  });
  it('+++ Should return Bø1,000.01', () => {
    const price = format.toPrice(100001);
    expect(price).toBe('Bø1,000.01');
  });
  it('+++ Should return -Bø1,000.01', () => {
    const price = format.toPrice(-100001);
    expect(price).toBe('-Bø1,000.01');
  });
});

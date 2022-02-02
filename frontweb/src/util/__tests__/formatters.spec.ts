import { formatPrice } from "util/formatters";

describe ('formatPrice for positive numbers', () => {

    test('formatPrice should format number pt-BR when given 10.1', () => {
        // ARRANGE
        const  value = 10.3;
        // ACT
        const result = formatPrice(value);
        // ASSERT
        expect (result).toEqual("10,30");
    });

    it('formatPrice should format number pt-BR when given 0.1', () => {
        // ARRANGE
        const  value = 0.1;
        // ACT
        const result = formatPrice(value);
        // ASSERT
        expect (result).toEqual("0,10");
    });
});

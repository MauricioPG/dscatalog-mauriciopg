import { formatPrice } from "util/formatters";

describe ('formatPrice for positive numbers', () => {

    test('formatPrice should format number pt-BR when given 10.1', () => {
        const  value = 10.3;
        const result = formatPrice(value);
        expect (result).toEqual("10,30");
    });

    it('formatPrice should format number pt-BR when given 0.1', () => {
        const  value = 0.1;
        const result = formatPrice(value);
        expect (result).toEqual("0,10");
    });
});

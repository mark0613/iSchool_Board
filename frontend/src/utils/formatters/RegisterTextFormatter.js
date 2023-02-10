import { DateFormatter } from './DateFormatter';

export class RegisterTextFormatter {
    static formatWithPlus(text) {
        if (typeof text !== 'string') {
            return text;
        }

        if (text === '') {
            return text;
        }

        let newText = text;
        let withPlus = false;
        if (text.includes('+')) {
            newText = text.replace('+', '');
            withPlus = true;
        }
        const result = DateFormatter.format(newText, 'MM/DD');
        return withPlus ? `${result}+` : result;
    }
}

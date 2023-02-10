import Moment from 'moment';

export class DateFormatter {
    static format(string, format) {
        return Moment(string).format(format);
    }

    static datetime(string) {
        return DateFormatter.format(string, 'YYYY-MM-DD HH:mm:ss');
    }

    static date(string) {
        return DateFormatter.format(string, 'YYYY-MM-DD');
    }

    static monthAndDay(string) {
        return DateFormatter.format(string, 'MM/DD');
    }
}

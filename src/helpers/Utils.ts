import CryptoJS from 'crypto-js';

export class Utils {

    static dateformat(date: Date, format: string): string {

        return format.replace(/%[YMDHMS]/g, (value) => {

            let Responses: number;

            switch (value) {
                case '%Y':
                    return date.getFullYear().toString();
                case '%m':
                    Responses = 1 + date.getMonth();
                    break;
                case '%d':
                    Responses = date.getDate();
                    break;
                case '%H':
                    Responses = date.getHours();
                    break;
                case '%M':
                    Responses = date.getMinutes();
                    break;
                case '%S':
                    Responses = date.getSeconds();
                    break;
                default:
                    return value.slice(1);
            }

            return ('0' + Responses).slice(-2);
        });
    }

    static filter(allowed: string[], raw: any): any {

        return Object.keys(raw).filter((key) => { 

            return allowed.includes(key);

        }).reduce((obj: any, key: any) => {

            obj[key] = raw[key];

            return obj;

        }, {});
    }

    static hash(): string {

        return CryptoJS.lib.WordArray.random(128 / 8).toString();
    }

    static md5(text: string): string {

        return CryptoJS.MD5(text).toString();
    }

    static sleep(time: number): Promise<void> {

        return new Promise(resolve => setTimeout(resolve, time));
    }
}

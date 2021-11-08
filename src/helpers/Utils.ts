import CryptoJS from 'crypto-js';

export class Utils {

    static hash(): string {

        return CryptoJS.lib.WordArray.random(128 / 8).toString();
    }

    static md5(text: string): string {

        return CryptoJS.MD5(text).toString();
    }
}

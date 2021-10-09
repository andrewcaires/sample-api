import { Logs } from '../models';

import { Utils } from '../helpers/Utils';

enum ColorLog {

    ERROR = '\x1b[31m',
    INFO = '\x1b[36m',
    NONE = '\x1b[37m',
    SUCCESS = '\x1b[32m',
    WARNING = '\x1b[33m'
}

type TypesLog = 'error' | 'info' | 'success' | 'warning' | '';

export class Log {

    static write(message: string, source?: string) {

        Log.writeColor(ColorLog.NONE, '', message, source);
    }

    static error(message: string, source?: string) {

        Log.writeColor(ColorLog.ERROR, 'error', message, source);
    }

    static info(message: string, source?: string) {

        Log.writeColor(ColorLog.INFO, 'info', message, source);
    }

    static success(message: string, source?: string) {

        Log.writeColor(ColorLog.ERROR, 'success', message, source);
    }

    static warning(message: string, source?: string) {

        Log.writeColor(ColorLog.WARNING, 'warning', message, source);
    }

    private static writeRaw(color: ColorLog, type: TypesLog, message: string) {

        console.log('>', color, type + (' ').repeat(10 - type.length), '\x1b[37m', '|', Utils.dateformat(new Date, '%H:%M:%S'), '|', message);
    }

    private static writeColor(color: ColorLog, type: TypesLog, message: string, source?: string) {

        Log.writeRaw(color, type, message);

        Logs.create({ type, source, message }).catch(() => {});
    }
}

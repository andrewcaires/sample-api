import { Logs } from '../bin/models';

import { Utils } from '../helpers/Utils';

enum ColorLog {

    ERROR = '\x1b[31m',
    INFO = '\x1b[36m',
    NONE = '\x1b[37m',
    SUCCESS = '\x1b[32m',
    WARNING = '\x1b[33m'
}

type TypesLog = 'error' | 'info' | 'success' | 'warning' | '';

const writeRaw = (color: ColorLog, type: TypesLog, message: string) => {

    console.log('>', color, type + (' ').repeat(10 - type.length), '\x1b[37m', '|', Utils.dateformat(new Date, '%H:%M:%S'), '|', message);
}

const writeColor = (color: ColorLog, type: TypesLog, message: string) => {

    writeRaw(color, type, message);

    Logs.create({type: type, message: message}).catch(console.log);
}

export class Log {

    static write(message: string) {

        writeColor(ColorLog.NONE, '', message);
    }

    static error(message: string) {

        writeColor(ColorLog.ERROR, 'error', message);
    }

    static info(message: string) {

        writeColor(ColorLog.INFO, 'info', message);
    }

    static success(message: string) {

        writeColor(ColorLog.ERROR, 'success', message);
    }

    static warning(message: string) {

        writeColor(ColorLog.WARNING, 'warning', message);
    }
}

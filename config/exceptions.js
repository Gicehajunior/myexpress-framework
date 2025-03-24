const fs = require('fs');
const path = require('path');
const winston = require('winston'); 
const moment = require('moment');
const config = require('@config/config');

class Exception extends Error {
    constructor(status, code, message, reason = null, logLevel='info', logFile = 'error_log.txt') {
        super(message);
        this.status = status;
        this.code = code;
        this.reason = reason;
        this.logLevel = logLevel;
        this.logFile = logFile; 
    }

    mexLogger() { 
        const logDetails = `Status: ${this.status}, Code: ${this.code}, Message: ${this.message}, Reason: ${this.reason || 'N/A'}`;
        this.assistantLogger().error(logDetails);  
    }

    assistantLogger() {
        const logDir = config.PATHS.PUBLIC + '/logs';
        
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        return winston.createLogger({
            level: this.logLevel,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().format('YYYY-MM-DD HH:mm:ss')
                }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: path.join(logDir, this.logFile) })
            ]
        });
    }
}

module.exports = Exception;

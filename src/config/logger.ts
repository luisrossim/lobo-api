import winston from "winston";
import dotenv from "dotenv";
import { format as dateFormat } from 'date-fns';

dotenv.config();

const { combine, timestamp, printf } = winston.format;
const isProduction = process.env.NODE_ENV === 'production';

const format = combine(
    timestamp(),
    printf(({ timestamp, level, message }) => {
        const date = new Date(timestamp as string);
        const localTimestamp = dateFormat(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        return `${localTimestamp} ${level}: ${message}`;
    })
);

const logger = winston.createLogger({
    level: isProduction ? 'info' : 'debug',
    format,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/standard.log" })
    ]
});

export default logger;

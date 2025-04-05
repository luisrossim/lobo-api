import { InvalidArgumentsException } from "../exceptions/invalid-arguments.js";
import { isValid, parse } from "date-fns";

export class Utils {
    static parseStringToValidDate(_data: string){
        if (!_data) {
            throw new InvalidArgumentsException('Data inexistente.');
        }

        const dataParsed = parse(_data, 'dd/MM/yyyy', new Date());

        if (!isValid(dataParsed)) {
            throw new InvalidArgumentsException('Data inválida.');
        }

        return dataParsed;
    }
    

    static parseIntervalToValidDate(dataInicial: string, dataFinal: string){
        if (!dataInicial || !dataFinal) {
            throw new InvalidArgumentsException('Intervalo de data inexistente.');
        }

        const dataInicialParsed = parse(dataInicial, 'dd/MM/yyyy', new Date());
        const dataFinalParsed = parse(dataFinal, 'dd/MM/yyyy', new Date());

        if (!isValid(dataInicialParsed) || !isValid(dataFinalParsed)) {
            throw new InvalidArgumentsException('Intervalo de data inválido.');
        }

        dataFinalParsed.setHours(23, 59, 59, 999);

        return {dataInicialParsed, dataFinalParsed};
    }
    

    static parseParamToValidNumber(value: any): number {
        const number = Number(value);
    
        if (isNaN(number) || number <= 0) {
            throw new InvalidArgumentsException('Parâmetros numéricos inválidos.');
        }
    
        return number;
    }
    

    static parseStringToBoolean(value: any): boolean {
        const stringValue = String(value).toLowerCase();
    
        const truthyValues = ["true", "1"];
        const falsyValues = ["false", "0"];
    
        if (truthyValues.includes(stringValue)) {
            return true;
        }
    
        if (falsyValues.includes(stringValue)) {
            return false;
        }

        throw new InvalidArgumentsException('Parâmetro de status inválido.');
    }

    static formatarValor(valor: number): string {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
}

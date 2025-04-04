import { isValid, parse } from "date-fns";

export class Utils {
    static parseIntervalToValidDate(dataInicial: string, dataFinal: string){
        if (!dataInicial || !dataFinal) {
            throw new Error('Intervalo inválido ou inexistente.');
        }

        const dataInicialParsed = parse(dataInicial, 'dd/MM/yyyy', new Date());
        const dataFinalParsed = parse(dataFinal, 'dd/MM/yyyy', new Date());

        if (!isValid(dataInicialParsed) || !isValid(dataFinalParsed)) {
            throw new Error('Datas inválidas.');
        }

        dataFinalParsed.setHours(23, 59, 59, 999);

        return {dataInicialParsed, dataFinalParsed};
    }
    

    static parseParamToValidNumber(value: any): number {
        const number = Number(value);
    
        if (isNaN(number) || number <= 0) {
            throw new Error('Parâmetros da consulta inválidos.');
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
    
        throw new Error("Status inválido.");
    }

    static formatarValor(valor: number): string {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
}

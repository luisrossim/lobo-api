import { Utils } from '../../utils/utils.service';

describe("UtilsService (Testes Unitários)", () => {
  describe("parseParamToValidNumber", () => {
    it("deve retornar o número válido", () => {
      const result = Utils.parseParamToValidNumber("1");
      expect(result).toBe(1);
    });

    it("deve lançar erro para número negativo", () => {
      expect(() => Utils.parseParamToValidNumber("-5")).toThrow('Parâmetros da consulta inválidos.');
    });

    it("deve lançar erro para valor inválido", () => {
      expect(() => Utils.parseParamToValidNumber("abc")).toThrow('Parâmetros da consulta inválidos.');
    });

    it("deve lançar erro para zero", () => {
      expect(() => Utils.parseParamToValidNumber("0")).toThrow('Parâmetros da consulta inválidos.');
    });
  });

  describe("parseIntervalToValidDate", () => {
    it("deve retornar datas válidas", () => {
      const result = Utils.parseIntervalToValidDate("01/01/2024", "31/01/2024");
      expect(result.dataInicialParsed).toBeInstanceOf(Date);
      expect(result.dataFinalParsed).toBeInstanceOf(Date);
      expect(result.dataFinalParsed.getHours()).toBe(23);
      expect(result.dataFinalParsed.getMinutes()).toBe(59);
      expect(result.dataFinalParsed.getSeconds()).toBe(59);
      expect(result.dataFinalParsed.getMilliseconds()).toBe(999);
    });

    it("deve lançar erro para datas inválidas", () => {
      expect(() => Utils.parseIntervalToValidDate("32/01/2024", "31/01/2024")).toThrow('Datas inválidas.');
    });

    it("deve lançar erro para datas vazias", () => {
      expect(() => Utils.parseIntervalToValidDate("", "31/01/2024")).toThrow('Intervalo inválido ou inexistente.');
      expect(() => Utils.parseIntervalToValidDate("01/01/2024", "")).toThrow('Intervalo inválido ou inexistente.');
    });
  });

  describe("parseStringToBoolean", () => {
    it("deve retornar true para valores verdadeiros", () => {
      expect(Utils.parseStringToBoolean("true")).toBe(true);
      expect(Utils.parseStringToBoolean("1")).toBe(true);
    });

    it("deve retornar false para valores falsos", () => {
      expect(Utils.parseStringToBoolean("false")).toBe(false);
      expect(Utils.parseStringToBoolean("0")).toBe(false);
    });

    it("deve lançar erro para valor inválido", () => {
      expect(() => Utils.parseStringToBoolean("invalido")).toThrow('Status inválido.');
    });

    it("deve ser case insensitive", () => {
      expect(Utils.parseStringToBoolean("TRUE")).toBe(true);
      expect(Utils.parseStringToBoolean("FALSE")).toBe(false);
    });
  });

  describe("formatarValor", () => {
    it("deve formatar número com duas casas decimais", () => {
      expect(Utils.formatarValor(1234.56)).toBe("1.234,56");
    });

    it("deve formatar número inteiro com duas casas decimais", () => {
      expect(Utils.formatarValor(1234)).toBe("1.234,00");
    });

    it("deve formatar número negativo", () => {
      expect(Utils.formatarValor(-1234.56)).toBe("-1.234,56");
    });

    it("deve formatar zero", () => {
      expect(Utils.formatarValor(0)).toBe("0,00");
    });
  });
});



import { MaskService } from "react-native-masked-text";

export const convertMoney = (valor) => {
    if (valor == null) {
        return "R$ 0,00"
    }
    if (valor.toString().includes("-")) {
        var money = MaskService.toMask('money', valor)
        let value = money.split("R$");
        value = `- R$ ${value[1]}`
        return value;
    } else {
        var money = MaskService.toMask('money', valor)
        let value = money.split("R$");
        value = `R$ ${value[1]}`
        return value;
    }
};

export const convertMoneyFloat = (valor) => {
    if (valor == null) {
        return 0
    }
    if (valor.toString().includes("R$")) {
        let value = valor.toString().replace('R$', '').replace(/[.*+?^${}()|[\]\\]/g, '').replace(",", ".");;
        return parseFloat(value);
    } else {
        return valor;
    }
};
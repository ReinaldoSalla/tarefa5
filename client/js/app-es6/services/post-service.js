import { HttpService } from "./HttpService";

export class PostService {
    constructor(inputData, inputQuantidade, inputValor) {
        this.inputData = inputData;
        this.inputQuantidade = inputQuantidade;
        this.inputValor = inputValor;
        this.negociacao = {
            data: this.inputData.value,
            quantidade: this.inputQuantidade.value,
            valor: this.inputValor.value
        }
        this.convertToInteger()
    }

    convertToInteger() {
        this.negociacao.quantidade = parseInt(this.negociacao.quantidade);
        this.negociacao.valor = parseInt(this.negociacao.valor);
    }

    sendData() {
        return new HttpService().post('api/negotiations/', this.negociacao)
    }
}
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
    }


    sendData() {
        return new HttpService().post('api/negotiations/', this.negociacao)
    }
}
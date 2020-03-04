import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('#add').onclick = negociacaoController.sendPost.bind(negociacaoController);
document.querySelector('#import').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
document.querySelector('#delete').onclick = negociacaoController.apaga.bind(negociacaoController);

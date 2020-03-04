import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';
import { PostService } from '../services/post-service';

class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia' , 'ordena', 'inverteOrdem');
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');    
        this._ordemAtual = '';
        this._service = new NegociacaoService();
        this.importaNegociacoesSalvas();
        //_this.automaticallyImport();

    }
    
    _automaticallyImport() {
        this._service
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
       setInterval(() => {
           this.importaNegociacoes();
       }, 3000);                
    }

    importaNegociacoesSalvas() {
        this._service
            .importaSalvas(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                //this._mensagem.texto = 'Negociações do MongoDB importadas';   
            }))
            .catch(erro => this._mensagem.texto = erro);   
    }
    
    importaNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);                              
    }

    
    // IndexedDB
    /*
    adiciona(event) {
        event.preventDefault();
        
        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    */ 

    // MongoDB
    sendPost(event) {
        /* Validations are made in the server, not in the client side */
        event.preventDefault();
        let negociacao = this._criaNegociacao();
        const postService = new PostService(
            this._inputData,
            this._inputQuantidade,
            this._inputValor
        )
        postService.sendData()
            .then(response => {
                if(response.status === 201) {
                    this._mensagem.texto = "Negociação cadastrada com sucesso";
                    this._limpaFormulario();   
                    this._listaNegociacoes.adiciona(negociacao);
                } else {
                    this._mensagem.texto = "Não foi possível cadastrar a negociação";
                    this._limpaFormulario();   
                }
            })
            .catch(err => console.error(err)); 
    }
    
    apaga() {    
        this._service.deletaSalvas();
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();                
            })
            .catch(erro => this._mensage.texto = erro);
    }
    
    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));    
    }
    
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
    
    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem(); 
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);    
        }
        this._ordemAtual = coluna;    
    }
}


let negociacaoController = new NegociacaoController();

export function currentInstance() {

    return negociacaoController;

}
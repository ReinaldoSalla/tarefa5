'use strict';

System.register(['../models/ListaNegociacoes', '../models/Mensagem', '../views/NegociacoesView', '../views/MensagemView', '../services/NegociacaoService', '../helpers/DateHelper', '../helpers/Bind', '../models/Negociacao', '../services/post-service'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacaoService, DateHelper, Bind, Negociacao, PostService, _typeof, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function currentInstance() {
        return negociacaoController;
    }

    _export('currentInstance', currentInstance);

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_servicesPostService) {
            PostService = _servicesPostService.PostService;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');
                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
                    this._ordemAtual = '';
                    this._service = new NegociacaoService();
                    this.importaNegociacoesSalvas();
                    //_this.automaticallyImport();
                }

                _createClass(NegociacaoController, [{
                    key: '_automaticallyImport',
                    value: function _automaticallyImport() {
                        var _this = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            return _this._mensagem.texto = erro;
                        });
                        setInterval(function () {
                            _this.importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'importaNegociacoesSalvas',
                    value: function importaNegociacoesSalvas() {
                        var _this2 = this;

                        this._service.importaSalvas(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                _this2._listaNegociacoes.adiciona(negociacao);
                                //this._mensagem.texto = 'Negociações do MongoDB importadas';   
                            });
                        }).catch(function (erro) {
                            return _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this3 = this;

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                _this3._listaNegociacoes.adiciona(negociacao);
                                _this3._mensagem.texto = 'Negociações do período importadas';
                            });
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'sendPost',
                    value: function sendPost(event) {
                        var _this4 = this;

                        event.preventDefault();
                        var negociacao = this._criaNegociacao();
                        var postService = new PostService(this._inputData, this._inputQuantidade, this._inputValor);
                        postService.sendData().then(function (res) {
                            if (res.status === 201) {
                                _this4._mensagem.texto = "Negociação cadastrada com sucesso";
                                _this4._limpaFormulario();
                                _this4._listaNegociacoes.adiciona(negociacao);
                            } else {
                                res.json().then(function (data) {
                                    _this4._mensagem.texto = "Não foi possível cadastrar a negociação";
                                    console.log(_typeof(data.message));
                                    if (typeof data.message !== "string") {
                                        data.message.forEach(function (err) {
                                            console.log(err.property);
                                            if (err.property === "quantidade") {
                                                console.log("error in quantidade");
                                            } else if (err.property === "valor") {
                                                console.log("error in valor");
                                            }
                                        });
                                    } else {
                                        console.log(data.message);
                                    }
                                });
                            }
                        }).catch(function (err) {
                            return console.log(err);
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this5 = this;

                        this._service.deletaSalvas();
                        this._service.apaga().then(function (mensagem) {
                            _this5._mensagem.texto = mensagem;
                            _this5._listaNegociacoes.esvazia();
                        }).catch(function (erro) {
                            return _this5._mensage.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {
                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {
                        if (this._ordemAtual == coluna) {
                            this._listaNegociacoes.inverteOrdem();
                        } else {
                            this._listaNegociacoes.ordena(function (p, s) {
                                return p[coluna] - s[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map
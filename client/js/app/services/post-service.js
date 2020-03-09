"use strict";

System.register(["./HttpService"], function (_export, _context) {
    "use strict";

    var HttpService, _createClass, PostService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }],
        execute: function () {
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

            _export("PostService", PostService = function () {
                function PostService(inputData, inputQuantidade, inputValor) {
                    _classCallCheck(this, PostService);

                    this.inputData = inputData;
                    this.inputQuantidade = inputQuantidade;
                    this.inputValor = inputValor;
                    this.negociacao = {
                        data: this.inputData.value,
                        quantidade: this.inputQuantidade.value,
                        valor: this.inputValor.value
                    };
                    this.convertToInteger();
                }

                _createClass(PostService, [{
                    key: "convertToInteger",
                    value: function convertToInteger() {
                        this.negociacao.quantidade = parseInt(this.negociacao.quantidade);
                        this.negociacao.valor = parseInt(this.negociacao.valor);
                    }
                }, {
                    key: "sendData",
                    value: function sendData() {
                        return new HttpService().post('api/negotiations/', this.negociacao);
                    }
                }]);

                return PostService;
            }());

            _export("PostService", PostService);
        }
    };
});
//# sourceMappingURL=post-service.js.map
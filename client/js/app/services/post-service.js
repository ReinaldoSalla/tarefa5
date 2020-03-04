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
                    this.usDate = this.convertDate();
                    this.negociacao = {
                        data: this.usDate,
                        quantidade: this.inputQuantidade.value,
                        valor: this.inputValor.value
                    };
                }

                _createClass(PostService, [{
                    key: "convertDate",
                    value: function convertDate() {
                        // Client = day/month/year = 0/1/2
                        // Server = year/month/date = 2/1/0
                        var elements = this.inputData.value.split("/");
                        elements[1] = parseInt(elements[1] - 1);
                        return new Date(elements[2], elements[1], elements[0]);
                    }
                }, {
                    key: "sendData",
                    value: function sendData() {
                        var negociacao = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.negociacao;

                        return new HttpService().post('/negociacoes', negociacao);
                    }
                }]);

                return PostService;
            }());

            _export("PostService", PostService);
        }
    };
});
//# sourceMappingURL=post-service.js.map
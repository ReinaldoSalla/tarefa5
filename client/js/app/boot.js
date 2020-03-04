'use strict';

System.register(['./controllers/NegociacaoController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('#add').onclick = negociacaoController.sendPost.bind(negociacaoController);
      document.querySelector('#import').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);
      document.querySelector('#delete').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map
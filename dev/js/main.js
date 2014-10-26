var App = (function(Basket, ProdCol, Modal) {
    var
        setEvents
        , initModal
    ;

    initHelpers = function() {
        Handlebars.registerHelper('flag-spinner', function(product, options) {
            var sRet = '';

            sRet += '<span class="basket-spinner" ';
            sRet += 'data-id="' + product.id + '">';
            sRet += '</span>';

            return new Handlebars.SafeString(sRet);
        });
    }

    initModal = function() {
        $('#delivery, #payment, #contacts')
            .each(function(i, elem) {
                var
                    $elem = $(elem)
                    , contentElem = $('<div>').append($elem.html())
                    , id = $elem.attr('id')
                ;

                Modal.addContent(contentElem, id);
            });

        Modal.init();
    }

    setEvents = function() {
        ProdCol.on('change_count', function(ev, data) {
            var product = data.product;

            if(
                data.type === 'minus'
                && product.oCount.sale === 0
            ) {
                Basket.removeProduct(product);
            } else {
                Basket.addProduct(product);
            }
        });
    }

    return {
        init: function() {
            initHelpers();
            Modal.addContent(Basket.render, 'basket');
            Modal.afterClose(Basket.close);
            initModal();
            ProdCol.loadProducts();
            setEvents();
        }
    }
})(Basket, ProductsCollection, Modal)


$(function() {
    App.init();
});
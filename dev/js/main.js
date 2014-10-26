if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

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

            $.ajax({
                url: '/products.json'
                , dataType: 'json'
                , success: function(data) {
                    ProdCol.loadProducts(data);
                    setEvents();
                }
                , error: function(xhr, string, err) {
                    throw err;
                }
            });
        }
    }
})(Basket, ProductsCollection, Modal)


$(function() {
    App.init();
});
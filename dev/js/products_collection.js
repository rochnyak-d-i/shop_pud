var ProductsCollection;

ProductsCollection = (function() {
    var
        $el = $('.products__collection')
        , products = []
        , addProduct
        , removeProduct
        , loadProducts
        , setEvent
        , removeEvent

        , $cachedEvents = {}
    ;

    loadProducts = function (data) {
        var prodTmpl =
            Handlebars.compile($('#prod_tmpl').html());

        $.each(data, function(index, productData) {
            if(!(index % 3)) {
                $el.append('<div class="clearfix"></div>')
            }
            addProduct(productData);
        });
    }

    addProduct = function(data) {
        var product = (data instanceof Product)
            ? data : new Product(data, ProductsCollection);

        products.push(product);

        setEvent(product);
        $el.append(product.$el);
    }

    removeProduct = function(product) {
        var
            type = typeof product
            , id
        ;

        if(type = 'object' && product instanceof Product) {
            id = product.id
        } else {
            id = parseInt(product);
        }

        if(!id) {
            return false;
        }

        var i;
        for(i = products.length; i--;) {
            if(products[i].id !== id) {
                continue;
            }

            removeEvent(products[i]);
            products[i].remove();
            products.splice(i, 1);
            break;
        }

        return true;
    }

    setEvent = function(product) {
        $cachedEvents[product.id] = function(data) {
            $el.trigger('change_count', data);
        }

        product.$el.on('change_count', $cachedEvents[product.id]);
    }

    removeEvent = function(product) {
        product.off('change_count', $cachedEvents[product.id]);
    }

    return {
        addProduct: addProduct
        , removeProduct: removeProduct
        , loadProducts: loadProducts
        , on: $.proxy($el.on, $el)
    }
})()
var ProductsCollection;

ProductsCollection = (function() {
    var
        $el = $('#products')
        , products = []
        , addProduct
        , removeProduct
        , loadProducts
    ;

    loadProducts = function (data) {
        var data = {0:{
            id: 1
            , name: 'Товар'
            , images: ['css/images/pencil.jpg', '/img2.png']
            , price: 100
            , count: 3
            , tmpl: prodTmpl
        }, 1:{
            id: 2
            , name: 'Товар2'
            , images: ['css/images/pencil.jpg', '/img2.png']
            , price: 200
            , count: 7
            , tmpl: prodTmpl
        }};

        var prodTmpl =
            Handlebars.compile($('#prod_tmpl').html());

        $.each(data, function(index, productData) {
            addProduct(productData);
        })
    }

    addProduct = function(data) {
        var product = (data instanceof Product)
            ? data : new Product(data, ProductsCollection);

        products.push(product);
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

            products[i].remove();
            products.splice(i, 1);
            break;
        }

        return true;
    }

    return {
        addProduct: addProduct
        , removeProduct: removeProduct
        , loadProducts: loadProducts
        , on: $.proxy($el.on, $el)
        , trigger: $.proxy($el.trigger, $el)
    }
})()
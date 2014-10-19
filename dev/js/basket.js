var Basket;

Basket = (function() {
    var
        products = {}
        , summa = 0
        , changeProduct
        , checkProduct
        , calculateSum
    ;

    changeProduct = function(product, event) {
        if(['add', 'remove'].indeOf(event) === -1) {
            return false;
        }

        if(!checkProduct(product)) {
            return false;
        }

        if(event === 'add') {
            products[product.id] = product;
        } else {
            delete products[product.id];
        }

        return true;
    }

    checkProduct = function(product) {
        if(
            !(product instanceof Product)
            || !product.id
        ) {
            return false;
        }

        return true;
    }

    calculateSum = function() {
        summa = 0;
        $.each(products, function(product, id) {
            summa += product.price * product.oCount.sale;
        });
    }

    return {
        addProduct: function(product) {
            return changeProduct(product, 'add');
        }

        , removeProduct: function(product) {
            return changeProduct(product, 'remove');
        }

        , getSum: function() {
            return summa;
        }
    }
})();
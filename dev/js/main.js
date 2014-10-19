var App = (function(Basket, ProdCol) {
    var
        setEvents
    ;

    setEvents = function() {
        ProdCol.on('change_count', function(ev, data) {
            var
                product = data.product
            ;

            //Basket.addProduct(product);
        })
    }

    return {
        init: function() {
            ProdCol.loadProducts();
            setEvents();
        }
    }
})(Basket, ProductsCollection)


$(function() {
    App.init();
});
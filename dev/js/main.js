var App = (function() {
    return {
        init: function() {
            ProductsCollection.loadProducts();
        }
    }
})()


$(function() {
    App.init();
});
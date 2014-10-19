function Product(data) {
    this.tmpl = data.tmpl || Handlebars.compile($('#prod_tmpl').html());
    this.$el = $();

    this.id = parseInt(data.id);
    this.name = data.name || '';
    this.images = data.images || [];
    this.price = parseInt(data.price) || 0;
    this.oCount = {
        store: parseInt(data.count) || 0
        , sale: 0
    }
}

Product.prototype.addToSale = function() {
    if(this.oCount.store === 0) {
        return false;
    }

    this.oCount.store -= 1;
    this.oCount.sale += 1;
}

Product.prototype.backToStore = function() {
    if(this.oCount.sale === 0) {
        return false;
    }

    this.oCount.store += 1;
    this.oCount.sale -= 1;
}

Product.prototype.render = function() {
    this.$el = $(this.tmpl(this));
}

Product.prototype.remove = function() {
    this.$el.remove();
}
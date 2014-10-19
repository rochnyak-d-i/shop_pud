var Product = (function() {
    function Prod(data, collection) {
        this.collection = collection;

        this.tmpl = data.tmpl || Handlebars.compile($('#prod_tmpl').html());
        this.$el = null;
        this.$cached = null;

        this.id = parseInt(data.id);
        this.name = data.name || '';
        this.images = data.images || [];
        this.price = parseInt(data.price) || 0;
        this.oCount = {
            store: parseInt(data.count) || 0
            , sale: 0
        }

        this.render();
        this.setEvents();
    }

    Prod.prototype.addToSale = function(num) {
        num || (num = 1);

        if(this.oCount.store === 0) {
            return false;
        }

        var
            store = this.oCount.store - num
            , sale = this.oCount.sale + num
        ;

        if(store < 0) {
            store = 0;
            sale = this.oCount.sale + this.oCount.store;
        }

        this.oCount.store = store;
        this.oCount.sale = sale;

        return true;
    }

    Prod.prototype.backToStore = function(num) {
        num || (num = 1);

        if(this.oCount.sale === 0) {
            return false;
        }

        var
            store = this.oCount.store + num
            , sale = this.oCount.sale - num
        ;

        if(sale < 0) {
            sale = 0;
            store = this.oCount.store + this.oCount.sale;
        }

        this.oCount.store = store;
        this.oCount.sale = sale;

        return true;
    }

    Prod.prototype.setToSale = function(count) {
        var maxCount;
        maxCount = this.oCount.store + this.oCount.sale

        if(maxCount <= count) {
            this.oCount.store = 0;
            this.oCount.sale = maxCount;
        } else {
            this.oCount.sale = count;
            this.oCount.store = maxCount - count;
        }
    }

    Prod.prototype.render = function() {
        var str = $.trim(this.tmpl(this));

        this.$el = $(str);
        this.$cached = {
            minus: this.$el.find('.product__count__minus')
            , plus: this.$el.find('.product__count__plus')
            , current: this.$el.find('.product__count__current')
        }
    }

    Prod.prototype.remove = function() {
        this.$el.remove();
    }

    Prod.prototype.setEvents = function() {
        var
            $plus = this.$cached.plus
            , $minus = this.$cached.minus
            , $current = this.$cached.current
        ;

        $plus.on('click', $.proxy(clickPlus, this));
        $minus.on('click', $.proxy(clickMinus, this));
        $current.on('keypress', $.proxy(keypressCurrent, this));
        $current.on('keyup', $.proxy(keyupCurrent, this));
        $current.on('change', $.proxy(changeCurrent, this));
    }

    var
        BACKSPACE = 8
        , NUMBERS = /[0-9]/
    ;

    function clickPlus(ev) {
        if(!this.addToSale()) {
            return false;
        }

        this.$cached.current.val(this.oCount.sale);
        this.collection.trigger('change_count', {
            type: 'plus'
            , product: this
        });
    }

    function clickMinus(ev) {
        if(!this.backToStore()) {
            return false;
        }

        this.$cached.current.val(this.oCount.sale);
        this.collection.trigger('change_count', {
            type: 'minus'
            , product: this
        });
    }

    function keypressCurrent(ev) {
        var
            keyCode = ev.keyCode
            , charStr = String.fromCharCode(keyCode);
        ;

        if(keyCode !== BACKSPACE && !NUMBERS.test(charStr)) {
            return false;
        }
    }

    function keyupCurrent(ev) {
        var
            $this = $(ev.target)
            , value = parseInt($this.val()) || 0;
        ;

        this.$cached.current.val(value);
    }

    function changeCurrent(ev) {
        var
            $this = $(ev.target)
            , value = parseInt($this.val()) || 0;
        ;

        this.setToSale(value);
        this.$cached.current.val(this.oCount.sale);
        this.collection.trigger('change_count', {
            type: 'value'
            , product: this
        });
    }

    return Prod;
})()
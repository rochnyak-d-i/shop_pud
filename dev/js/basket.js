var Basket;

Basket = (function() {
    var
        products = {}
        , summa = 0
        , tmpl = null
        , $el = null
        , changeProduct
        , checkProduct
        , calculateSum
        , render
        , setSpinner
        , close
        , removeEvents
        , afterCalcCb = null

        //закешированные обработчики
        //событий(для дальнейшего удаления)
        , $cachedEvents = {}
    ;

    render = function() {
        if(tmpl === null) {
            tmpl = Handlebars.compile($('#basket').html());
        }

        var sTmpl = tmpl(getData());
        sTmpl = $.trim(sTmpl);

        $el = $(sTmpl);
        $el.find('.basket-spinner').each(setSpinner);

        var sumEl = $el.find('.basket__price');
        afterCalcCb = function(summa) {
            sumEl.text(summa+'р');
        }

        return $el;
    }

    setSpinner = function(i, flag) {
        var
            $flag = $(flag)
            , productId = $flag.data('id')
            , product = products[productId]
            , $cached = product.$cached
            , arSpinner
            , $spinner = $()
        ;

        arSpinner = [
            $cached.current.clone(true)
            , $cached.minus.clone(true)
            , $cached.plus.clone(true)
        ];

        setEvent(product, function(data) {
            arSpinner[0].val(
                $cached.current.val()
            );
        })

        $.each(arSpinner, function(i, el) {
            $spinner = $spinner.add(el);
        });

        $flag.replaceWith($spinner)
    }

    setEvent = function(product, cb) {
        $cachedEvents[product.id] = cb;

        product.$el.on('change_count', $cachedEvents[product.id])
    }

    close = function() {
        removeEvents();
    }

    removeEvents = function() {
        $.each($cachedEvents, function(id, cb) {
            var product = products[id];

            if(!product) {
                return false;
            }

            product.$el.off('change_count', cb);
        });
        $cachedEvents = {};

        afterCalcCb = null;
    }

    getData = function() {
        return {
            sum: summa
            , products: products
        }
    }

    changeProduct = function(product, method) {
        if(['add', 'remove'].indexOf(method) === -1) {
            return false;
        }

        if(!checkProduct(product)) {
            return false;
        }

        var state = true;

        if(method === 'add') {
            if(products[product.id]) {
                state = false;
            } else {
                products[product.id] = product;
            }
        } else {
            if(!products[product.id]) {
                state = false;
            } else {
                delete products[product.id];
            }
        }

        calculateSum();
        return state;
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
        $.each(products, function(id, product) {
            summa += product.price * product.oCount.sale;
        });

        if(afterCalcCb) {
            afterCalcCb(summa);
        }
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

        , render: render

        , close: close
    }
})();
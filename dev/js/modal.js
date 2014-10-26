var Modal;

Modal = {
    $html: null
    , $modal: null
    , $blockContent: null
    , $items: null
    , $close: null
    , $wrapper: null
    , $contents: {}
    , afterCloseCb: null

    , init: function() {
        this.$modal = $('#modal');
        this.$wrapper = this.$modal.find('.modal__wrapper-content');
        this.$blockContent = this.$wrapper.find('.modal__content')
        this.$items = $('.navigation').find('.navigation__item');
        this.$html = $('html');
        this.$close = this.$wrapper.find('.modal__close');

        this.setEvents();
    }

    , setEvents: function() {
        this.$items.on('click', $.proxy(this.open, this));
        this.$modal.on('click', $.proxy(this.close, this));
        this.$blockContent.on('click', this.nope);
        this.$close.on('click', $.proxy(this.close, this));
    }

    , nope: function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    }

    , open: function(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        var
            el = $(ev.target)
            , self = this
            , id = el.attr('href').slice('1')
            , contentElem = self.$contents[id]
        ;

        if($.isFunction(contentElem)) {
            contentElem = contentElem();
        }

        if(!contentElem) {
            return false;
        }

        self.$blockContent.append(contentElem)
        self.$modal.fadeIn(function() {
            self.$html.css('overflow', 'hidden');
        });
    }

    , afterClose: function(cb) {
        this.afterCloseCb = cb;
    }

    , close: function(ev) {
        var self = this;

        self.$modal.fadeOut(function() {
            self.afterCloseCb && self.afterCloseCb();
            self.$blockContent.empty();
            self.$html.css('overflow', 'visible');
        });
    }

    , addContent: function(el, id) {
        this.$contents[id] = el;
    }
}
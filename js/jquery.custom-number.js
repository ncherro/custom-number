;(function ($, window, document, undefined) {

  var plugin_name = 'customNumber',
      defaults = {
        class_prefix: "custom-number"
      };

  function Plugin(el, opts) {
    this.el = el;
    this.$el = $(el);

    this.settings = $.extend({}, defaults, opts);

    this._defaults = defaults;
    this._name = plugin_name;

    this.init();
  };

  Plugin.prototype = {

    init: function() {
      this.min = this.$el.attr('min');
      this.max = this.$el.attr('max');

      var c = this.prefix('wrap') + ' ' + this.$el.attr('class').split(this.settings.class_prefix).join('');
      this.$wrap = $('<span class="' + c + '" />')
      this.$el.wrap(this.$wrap);

      this.$up = $('<span class="' + this.prefix('up') + '"><i></i></span>');
      this.$down = $('<span class="' + this.prefix('down') + '"><i></i></span>');
      this.$controls = $('<span class="' + this.prefix('controls') + '" />');
      this.$controls.append(this.$up, this.$down);
      this.$controls.insertAfter(this.$el);

      this.$up.click($.proxy(this.up, this));
      this.$down.click($.proxy(this.down, this));
    },

    prefix: function(str) {
      return this.settings.class_prefix + '-' + str;
    },

    up: function(e) {
      e.preventDefault();
      var val = this.$el.val();
      val ++;
      if (this.max && val > this.max) return;
      this.$el.val(val);
    },

    down: function(e) {
      e.preventDefault();
      var val = this.$el.val();
      val --;
      if (this.min && val < this.min) return;
      this.$el.val(val);
    }

  };


  $.fn[plugin_name] = function(opts) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + plugin_name)) {
        $.data(this, "plugin_" + plugin_name, new Plugin(this, opts));
      }
    });
  };

}(jQuery, window, document));


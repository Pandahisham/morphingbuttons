(function($) {
  'use strict';

  function Morph(btn, el, options) {

    var _options = options || {},
        _defaultOptions = {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        };

    setModal();
    init(btn, el, _options);

    function init(btn, el, options) {
      var el = $(el),
          btn = $(btn),
          options = extendOptions(options);

      btn.click(function(event) {
        event.preventDefault();
        if(isAnimating()) return;

        open(el, $(this), options);
      });

      el.find('.morph-close').add('#morph-modal').click(function(event) {
        event.preventDefault();
        if(isAnimating()) return;

        close(el, btn);
      });
    }

    function open(el, btn, options) {
      noScroll(el);
      noScroll($('body'));
      openModal();

      btn.css({ opacity: 0 });

      el.css({
        'margin-left': 0,
        'margin-top': 0,
        opacity: 1,
        display: 'block',
        width: btn.width(),
        height: btn.height(),
        'z-index': 2,
        position: 'fixed',
        left: btn.offset().left,
        top: setBtnPosY(btn)
      })
      .velocity(options, 'easeInOutQuart', function() {
        $(this).find('.morph-wrap').velocity('fadeIn', function() {
          allowScroll(el);
        });
      });
    }

    function close(el, btn) {
      noScroll(el);
      noScroll($('body'));
      closeModal();

      el.find('.morph-wrap').velocity('fadeOut', function() {
        el.velocity({
          left: btn.offset().left,
          top: setBtnPosY(btn),
          width: btn.width(),
          height: btn.height(),
          'margin-left': 0,
          'margin-top': 0,
        }, 'easeInOutQuart', function() {
          btn.css({ opacity: 1 });

          $(this).velocity('fadeOut', function() {
            allowScroll($('body'));
            allowScroll(el);
          });
        });
      });
    }

    function setBtnPosY(btn) {
      return btn.offset().top - $(window).scrollTop() + 'px';
    }

    function extendOptions(obj) {
      if(obj.width && obj.width !== '100%') {
        obj['margin-top'] = '-' + parseInt(obj.height, 10) / 2 + 'px';
        obj.top = '50%';
      }

      if(obj.height && obj.height !== '100%') {
        obj['margin-left'] = '-' + parseInt(obj.width, 10) / 2 + 'px';
        obj.left = '50%';
      }

      obj = $.extend(_defaultOptions, obj);
      return obj;
    }

    function setModal() {
      if($('#morph-modal').length) return;

      $('<div/>', {
        'class': 'morph-modal',
        id: 'morph-modal',
        css: {
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          display: 'none',
          background: 'black',
          opacity: '0',
          'z-index': 1
        }
      }).appendTo('body');
    }

    function openModal(opacity) {
      opacity = typeof opacity === 'undefined' ? '.3' : opacity.toString();

      $('#morph-modal').velocity({
        'opacity': opacity
      }, { display: 'block' });
    }

    function closeModal() {
      $('#morph-modal').velocity('fadeOut');
    }
  }

  function noScroll(el) {
    el.css({ overflow: 'hidden' });
  }

  function allowScroll(el) {
    el.css({ overflow: 'auto' });
  }

  function isAnimating() {
    if($('.velocity-animating').length) return true;
  }

  window.Morph = Morph;

}(jQuery));

Morph('a.morph-1', 'div.morph-1', {width: '500px', height: '500px'});
Morph('a.morph-2', 'div.morph-2');
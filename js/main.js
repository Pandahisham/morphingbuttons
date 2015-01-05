(function($) {
  'use strict';

  var morphDefined = {
    morphfull: false,
    left: '50%',
    top: '50%',
    width: '600px',
    height: '300px',
  };
  morphDefined['margin-top'] = '-' + parseInt(morphDefined.height, 10) / 2 + 'px';
  morphDefined['margin-left'] = '-' + parseInt(morphDefined.width, 10) / 2 + 'px';

  function Morph(btn, el) {

    setModal();
    init(btn, el);

    function init(btn, el) {
      var el = $(el),
          btn = $(btn);

      //morphSize();

      btn.click(function(event) {
        event.preventDefault();
        open(el, $(this));
      });

      el.find('.morph-close').add('#morph-modal').click(function(event) {
        event.preventDefault();
        close(el, btn);
      });
    }

    function open(el, btn) {
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
      .velocity(morphDefined, 'easeInOutQuart', function() {
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

  window.Morph = Morph;

}(jQuery));

Morph('a.morph-1', 'div.morph-1');
Morph('a.morph-2', 'div.morph-2');
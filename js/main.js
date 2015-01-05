(function($) {

  var el = $('.morph-btn')
      t = el.offset().top,
      l = el.offset().left,
      temp = 0;

  var body = $('body');

  $('.morph-btn').click(function(event) {
    event.preventDefault();

    var morphFull = {
      morph: false,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    };

    var morphDefined = {
      morph: true,
      left: '50%',
      top: '50%',
      width: '600px',
      height: '300px',
    };
    morphDefined['margin-top'] = '-' + parseInt(morphDefined.height, 10) / 2 + 'px';
    morphDefined['margin-left'] = '-' + parseInt(morphDefined.width, 10) / 2 + 'px';

    $(this).hide();

    $('.wrapper').css({
      'z-index': 2,
      position: 'fixed',
      left: l + 'px',
      top: temp + 'px',
      width: el.width(),
      height: el.height(),
      visibility: 'visible'
    })
      .velocity(morphDefined, 'easeInOutCubic', function() {
        //body.addClass('no-scroll');

        $(this).find('.contain').velocity('fadeIn');
      });
  });

  $('.morph-close').click(function(event) {
    event.preventDefault();

    body.removeClass('no-scroll');

    $('.contain').velocity('fadeOut', function() {
      $('.wrapper').velocity({
        top: temp + 'px',
        left: l + 'px',
        width: el.width(),
        height: el.height(),
        'margin-top': 0,
        'margin-left': 0,
        'z-index': '-1',
      }, { easing: 'easeInOutCubic', visibility: 'hidden', complete: function() {
          $('.morph-btn').show();
        }
      });
    });
  });

  $(window).scroll(function() {
    temp = t - $(this).scrollTop() || t;
  });
  $(window).scroll();

  $(window).resize(function() {
    l = el.offset().left;
  });

  function Morphingbutton(container) {
    var self = this,
        container = container,
        elOffsetTop = container.offset().top,
        elOffsetLeft = container.offset().left,
        temp = 0;

    function open() {

    }

    function close() {

    }
  }

})(jQuery);
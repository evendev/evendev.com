(function($) {

  var App = {};

  App.formatDates = function() {
    var pubdate = $('time[pubdate]');
    pubdate.each(function(i, el) {
      var $el = $(el);
      var elPubdate = $el.attr('datetime');
      var mDate = moment(elPubdate).fromNow();
      $el.html(mDate + '');
    });
  };

  $(document).ready(function() {
    App.formatDates();
  });

})(jQuery);

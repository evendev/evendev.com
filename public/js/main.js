(function($) {

  var App = {};

  App.formatDates = function() {
    if ($('body').hasClass('page-article')) {
      var pubdate = $('time[pubdate]'),
          date = moment(new Date(pubdate.attr('datetime')));
      pubdate.html(date.fromNow() + ' ');
    }
  };

  $(document).ready(function() {
    App.formatDates();
  });

})(jQuery);
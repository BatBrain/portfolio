$(document).ready(function() {

  // Set up defaults for JS-enabled browser
  $('nav li:first-child').addClass('active');;
  $('.more-less-content').hide();
  $('.more-less-toggle').show();

  // Event listeners
  $(document).on('scroll', onScroll);
  $('nav a').on('click', onNavClick);
  $('.more-less-toggle').on('click', onMoreLessClick);

});

function onScroll(event) {
  // Detemine current position
  var scrollPos = $(document).scrollTop();

  // For each link, remove active class
  // Add active class for current section
  $('nav a').each(function() {
    var $currentLink = $(this);
    var refElement = $($currentLink.attr('href'));

    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('nav ul li').removeClass("active");
      $currentLink.parent().addClass("active");
    } else {
      $currentLink.parent().removeClass("active");
    }
  });
}

function onNavClick(event) {
  event.preventDefault();

  $(document).off('scroll');

  // Remove active class from all nav list items,
  // then add it to selected list item
  $('nav li').each(function() {
    $(this).removeClass('active');
  });
  // Add active class to selected list item
  $(this).parent().addClass('active');

  // Determine selected section and navigate to it
  var target = this.hash;
  $target = $(target);
  $('html, body').stop().animate({
      'scrollTop': $target.offset().top+2
  }, 'slow', 'swing', function() {
      $(document).on("scroll", onScroll);
  });
}

function onMoreLessClick(event) {
  event.preventDefault();

  $(document).off('scroll');

  // Perform slide-toggle on preceding content area
  $(this).prev('.more-less-content').slideToggle('slow', function() {
    $(document).on('scroll', onScroll);
  });

  // Change text for more/less toggle
  if ($(this).text() == '+ more') { $(this).text('- less'); }
  else { $(this).text('+ more'); }
}

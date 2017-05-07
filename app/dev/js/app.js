$(document).ready(function() {
  $('.menu-mobile-open').on('click', function() {
    $('.menu-mobile-menu').slideDown(700);
  });

  $('.menu-mobile-close').on('click', function() {
    $('.menu-mobile-menu').slideUp(700);
  });

  $('.results .filter-item .title button').on('click', function() {
    $(this).closest('.results .filter-item').find('.checkbox-filter input[type=checkbox]').prop('checked', true);
  });

  $('.results .results-content .content-item .price button').on('click', function() {
    $(this).closest('.results .results-content .content-item').toggleClass('selected').find('.details').toggle();
  });

  $('.filter-result-info .result-buttons a.button.filters-toggle').on('click', function() {
    $('.results .filters').toggle();
  });
});​

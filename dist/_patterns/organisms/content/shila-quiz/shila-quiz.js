jQuery(document).ready(function ($) {
  'use strict';

  // Enable the 'Show results' button (if there is one) when a selection has
  // been made in all radio button groups.
  //
  // Source: http://stackoverflow.com/questions/28415769/jquery-disable-submit-button-unless-all-radio-button-group-checked
  var button = $('.quiz button');
  if (button.length > 0) {
    var radios = $('.quiz-answer-option input[type="radio"]');
    var arr = $.map(radios, function (el) {
      return el.name;
    });
    var groups = $.grep(arr, function (v, k) {
      return $.inArray(v, arr) === k;
    }).length;

    // Enable all radio buttons.
    radios.attr('disabled', false);

    radios.on('change', function () {
      button.prop('disabled', radios.filter(':checked').length < groups);
    });

    // 'Show results' button is clicked.
    button.on('click', function () {

      // Disable all radio buttons.
      radios.attr('disabled', true);

      // Calculate score based on selected radio buttons' parent element class names.
      var score = 0;
      radios.filter(':checked').each(function () {
        score += parseInt($(this).parent().attr('class').match(/quiz-answer-option--points-(\d+)/)[1]);
      });

      // Determine the result to show based on result class names.
      var matched = null;
      $('.quiz-result').each(function () {
        var required = parseInt($(this).attr('class').match(/quiz-result--points-required-(\d+)/)[1]);
        if (score >= required) {
          if (!matched || matched < required) {
            matched = required;
          }
        }
      });

      // Hide the button and show the matched result.
      button.attr('style', 'display: none');
      $('.quiz__result').attr('style', 'display: block');
      $('.quiz-result.quiz-result--points-required-' + matched).attr('style', 'display: block');
    });
  }
});

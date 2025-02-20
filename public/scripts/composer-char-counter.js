// Counter for the tweet form

$(document).ready(function() {
  
  // changes the output as the user types in their tweet
  $(this).on('input', function() {
    const input = $(this).find('textarea').val().length;
    const maxCount = $(this).find('#max-count').val();
    
    const total = maxCount - input;

    $(this).find('output').html(total);
    
  });

  // checks if counter is < 0 then changes it to red
  $(this).on('keyup keypress', function() {

    const currentCount = $(this).find('output').val();

    if (currentCount < 0) {
      $('.counter').addClass('red-counter');
    }
    if (currentCount >= 0) {
      $('.counter').removeClass('red-counter');
    }

  });

});

